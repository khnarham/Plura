import {
  BarChart3,
  Calendar,
  CheckCircle,
  Clipboard,
  Compass,
  Database,
  Flag,
  Headphones,
  Home,
  Info,
  Link,
  Lock,
  MessageCircle,
  Bell,
  CreditCard,
  User,
  Power,
  Receipt,
  Shield,
  Star,
  Sliders,
  Video,
  Wallet,
  AlertCircle,
  Settings2,
  PenLine,
} from "lucide-react";
import Chip from "../../icons/chip";
import Pipelines from "../../icons/pipleline";

export const pricingCards = [
  {
    title: 'Starter',
    description: 'Perfect for trying out plura',
    price: 'Free',
    duration: '',
    highlight: 'Key features',
    features: ['3 Sub accounts', '2 Team members', 'Unlimited pipelines'],
    priceId: '',
  },
  {
    title: 'Unlimited Saas',
    description: 'The ultimate agency kit',
    price: '$199',
    duration: 'month',
    highlight: 'Key features',
    features: ['Rebilling', '24/7 Support team'],
    priceId: 'price_1Qjgu3Eo6miWcGQr60j9FLhl',
  },
  {
    title: 'Basic',
    description: 'For serious agency owners',
    price: '$49',
    duration: 'month',
    highlight: 'Everything in Starter, plus',
    features: ['Unlimited Sub accounts', 'Unlimited Team members'],
    priceId: 'price_1Qjgu3Eo6miWcGQrvKfCcpI7',
  },
];

export const icons = [
  { value: 'chart', label: 'Bar Chart', path: BarChart3 },
  { value: 'headphone', label: 'Headphones', path: Headphones },
  { value: 'send', label: 'Send', path: PenLine },
  { value: 'pipelines', label: 'Pipelines', path: Pipelines },
  { value: 'calendar', label: 'Calendar', path: Calendar },
  { value: 'settings', label: 'Settings', path: Settings2 },
  { value: 'check', label: 'Check Circled', path: CheckCircle },
  { value: 'chip', label: 'Chip', path: Chip },
  { value: 'compass', label: 'Compass', path: Compass },
  { value: 'database', label: 'Database', path: Database },
  { value: 'flag', label: 'Flag', path: Flag },
  { value: 'home', label: 'Home', path: Home },
  { value: 'info', label: 'Info', path: Info },
  { value: 'link', label: 'Link', path: Link },
  { value: 'lock', label: 'Lock', path: Lock },
  { value: 'messages', label: 'Messages', path: MessageCircle },
  { value: 'notification', label: 'Notification', path: Bell },
  { value: 'payment', label: 'Payment', path: CreditCard },
  { value: 'power', label: 'Power', path: Power },
  { value: 'receipt', label: 'Receipt', path: Receipt },
  { value: 'shield', label: 'Shield', path: Shield },
  { value: 'star', label: 'Star', path: Star },
  { value: 'tune', label: 'Tune', path: Sliders },
  { value: 'videorecorder', label: 'Video Recorder', path: Video },
  { value: 'wallet', label: 'Wallet', path: Wallet },
  { value: 'warning', label: 'Warning', path: AlertCircle },
  { value: 'person', label: 'Person', path: User },
  { value: 'category', label: 'Category', path: Clipboard },
];
export const addOnProducts = [
  { title: 'Priority Support', id: 'prod_RdELFx7XX9yb4o' },
]


export type EditorBtns =
  | 'text'
  | 'container'
  | 'section'
  | 'contactForm'
  | 'paymentForm'
  | 'link'
  | '2Col'
  | 'video'
  | '__body'
  | 'image'
  | null
  | '3Col'

export const defaultStyles: React.CSSProperties = {
  backgroundPosition: 'center',
  objectFit: 'cover',
  backgroundRepeat: 'no-repeat',
  textAlign: 'left',
  opacity: '100%',
}