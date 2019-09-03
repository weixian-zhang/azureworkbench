
import ResourceDesigner from 'components/resource-designer'
import ResourceVisualizer from 'components/resource-visualizer'
import AzCommandCenter from 'components/azure-commandcenter'

export const routes = [
  { name: 'designer', path: '/designer', component: ResourceDesigner, display: 'Designer', icon: 'home' },
  //{ name: 'visualizer', path: '/visualizer', component: ResourceVisualizer, display: 'Visualizer', icon: 'home' },
  //{ name: 'commandcenter', path: '/commcenter', component: AzCommandCenter, display: 'CommandCenter', icon: 'home' },
  //{ name: 'counter', path: '/counter', component: CounterExample, display: 'Counter', icon: 'graduation-cap' },
  //{ name: 'fetch-data', path: '/fetch-data', component: FetchData, display: 'Fetch data', icon: 'list' }
]
