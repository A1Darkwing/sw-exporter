const { ipcRenderer, remote } = require('electron');

import React from 'react';

import { Menu, Button, Input } from 'semantic-ui-react';

class Head extends React.Component {
  constructor() {
    super();
    this.state = { 'proxyRunning': ipcRenderer.sendSync('proxyIsRunning') };
    this.config = remote.getGlobal('config');
  }

  toggleProxy(e) {
    if(ipcRenderer.sendSync('proxyIsRunning')) {
      this.setState({ 'proxyRunning': false });
      ipcRenderer.send('proxyStop');
    } else {
      this.setState({ 'proxyRunning': true });
      ipcRenderer.send('proxyStart');
    }
  }

  changePort(e) {
    const port = Number(e.target.value);
    this.config.Proxy.port = port;
    ipcRenderer.send('updateConfig')
  }

  render () {
    return (
      <Menu className="main-menu">
        <Menu.Item>
          <Input label='Port' defaultValue={this.config.Proxy.port} onChange={this.changePort.bind(this)} />
        </Menu.Item>
        <Menu.Item position='right'>
          <Button content={this.state.proxyRunning ? 'Stop Proxy' : 'Start Proxy'} icon={this.state.proxyRunning ? 'stop' : 'play'} labelPosition='right' onClick={this.toggleProxy.bind(this)} />
        </Menu.Item>
      </Menu>
    )
  }
}

module.exports = Head;