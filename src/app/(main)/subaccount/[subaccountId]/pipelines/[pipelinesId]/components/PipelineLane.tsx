'use client'
import { LaneDetail, TicketWithTags } from '@/lib/types'
import { Pipe } from 'node:stream'
import React, { Dispatch, SetStateAction, useMemo } from 'react'
import { useModal } from '../../../../../../../../provider/model-provider'
import { useRouter } from 'next/navigation'
import { Ticket } from '@prisma/client'
import CustomModal from '@/components/global/customModel'
import TicketForm from '@/app/site/components/forms/TicketForm'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Edit, MoreVertical, PlusCircleIcon, Trash } from 'lucide-react'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { cn } from '@/lib/utils'
import CreateLaneForm from '@/app/site/components/forms/LaneForm'
import { deleteLane, saveActivityLogsNotification } from '@/lib/quries'
import PipelineTicket from './PipelineTicket'

interface PipelaneLaneProps {
    setAllTickets: Dispatch<SetStateAction<TicketWithTags>>
    allTickets: TicketWithTags
    tickets: TicketWithTags
    pipelineId: string
    laneDetails: LaneDetail
    subaccountId: string
    index: number
  }
const PipelineLane: React.FC<PipelaneLaneProps> = ({
    setAllTickets,
    tickets,
    pipelineId,
    laneDetails,
    subaccountId,
    allTickets,
    index,
}) => {
    const {setOpen} = useModal();
    const router = useRouter()

    const amt = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'USD',
    })

    const lameEmit = useMemo(()=>{
        console.log(tickets);
        return tickets.reduce(
            (sum, ticket) => sum + (Number(ticket?.value) || 0),
            0
          )
    }, [tickets])
  
     const randomColor = `#${Math.random().toString(16).slice(2, 8)}`

     const addNewTicket = (ticket: TicketWithTags[0]) => {
       setAllTickets([...allTickets , ticket])
     } 

     const handleCreateTickets = () =>{
        setOpen(
            <CustomModal
              title="Create A Ticket"
              subheading="Tickets are a great way to keep track of tasks"
            >
              <TicketForm
                getNewTicket={addNewTicket}
                laneId={laneDetails.id}
                subaccountId={subaccountId}
              />
            </CustomModal>
          )
     }

     const handleEditLane = () => {
        setOpen(
          <CustomModal
            title="Edit Lane Details"
            subheading=""
          >
            <CreateLaneForm
              pipelineId={pipelineId}
              defaultData={laneDetails}
            />
          </CustomModal>
        )
      }
      const handleDeleteLane = async () => {
        try {
          const response = await deleteLane(laneDetails.id)
          await saveActivityLogsNotification({
            agencyId: undefined,
            description: `Deleted a lane | ${response?.name}`,
            subaccountId,
          })
          router.refresh()
        } catch (error) {
          console.log(error)
        }
      }
    
  return (
    <Draggable
    draggableId={laneDetails.id.toString()}
    index={index}
    key={laneDetails.id}
  >
    {(provided, snapshot) => {
      if (snapshot.isDragging) {
        //@ts-ignore
        const offset = { x: 300, y: 0 }
        //@ts-ignore
        const x = provided.draggableProps.style?.left - offset.x
        //@ts-ignore
        const y = provided.draggableProps.style?.top - offset.y
        //@ts-ignore
        provided.draggableProps.style = {
          ...provided.draggableProps.style,
          top: y,
          left: x,
        }
      }
      return (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="h-full"
        >
          <AlertDialog>
            <DropdownMenu>
              <div className="bg-slate-200/30 dark:bg-background/20  h-[700px] w-[300px] px-4 relative rounded-lg overflow-visible flex-shrink-0 ">
                <div
                  {...provided.dragHandleProps}
                  className=" h-14 backdrop-blur-lg dark:bg-background/40 bg-slate-200/60  absolute top-0 left-0 right-0 z-10 "
                >
                  <div className="h-full flex items-center p-4 justify-between cursor-grab border-b-[1px] ">
                    {/* {laneDetails.order} */}
                    <div className="flex items-center w-full gap-2">
                      <div
                        className={cn('w-4 h-4 rounded-full')}
                        style={{ background: randomColor }}
                      />
                      <span className="font-bold text-sm">
                        {laneDetails.name}
                      </span>
                    </div>
                    <div className="flex items-center flex-row">
                      <Badge className="bg-white text-black">
                      {amt.format(lameEmit)}
                      </Badge>
                      <DropdownMenuTrigger>
                        <MoreVertical className="text-muted-foreground cursor-pointer" />
                      </DropdownMenuTrigger>
                    </div>
                  </div>
                </div>

                <Droppable
                  droppableId={laneDetails.id.toString()}
                  isDropDisabled={false}
                  ignoreContainerClipping={true}
                  isCombineEnabled={false}
                  key={laneDetails.id}
                  type="ticket"
                >
                  {(provided) => (
                    <div className=" max-h-[700px] scrollbar-custom pt-12 ">
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="mt-2"
                      >
                        {tickets.map((ticket, index) => (
                         <PipelineTicket
                         allTickets={allTickets}
                         setAllTickets={setAllTickets}
                         subaccountId={subaccountId}
                         ticket={ticket}
                         key={ticket.id.toString()}
                         index={index}
                         />
                         
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  )}
                </Droppable>

                <DropdownMenuContent>
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <AlertDialogTrigger>
                    <DropdownMenuItem className="flex border-0 hover:bg-blue-600/70 items-center cursor-pointer gap-2">
                      <Trash size={15} />
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>

                  <DropdownMenuItem
                    className="flex items-center hover:bg-blue-600/70 cursor-pointer gap-2"
                    onClick={handleEditLane}
                  >
                    <Edit size={15} />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center hover:bg-blue-600/70 cursor-pointer gap-2"
                    onClick={handleCreateTickets}
                  >
                    <PlusCircleIcon size={15} />
                    Create Ticket
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </div>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you absolutely sure?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex items-center">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-destructive"
                    onClick={handleDeleteLane}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </DropdownMenu>
          </AlertDialog>
        </div>
      )
    }}
  </Draggable>

  )
}

export default PipelineLane