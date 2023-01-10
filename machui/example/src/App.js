import React from 'react'

import { Button } from 'machui'
import 'machui/dist/index.css'

const App = () => {
  return <div className="main">
    <Button type="primary">Primary Button</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button>
  </div>
}

export default App
