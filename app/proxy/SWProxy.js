const EventEmitter = require('events');
const http = require('http')
const httpProxy = require('http-proxy');

const {decrypt_request, decrypt_response} = require('./smon_decryptor');

class SWProxy extends EventEmitter {
  constructor() {
    super();
    this.httpServer = null;
    this.proxy = null;
  }
  start(port) {
    const self = this; // so event callbacks can access this SWProxy class

    if (port === undefined) { port = 8080; }

    var parsed_requests = [];

    this.proxy = httpProxy.createProxyServer({}).on('proxyRes', (proxyResp, req, resp) => {
      let resp_chunks = [];

      if (req.url.indexOf('qpyou.cn/api/gateway_c2.php') >= 0) {
        proxyResp.on('data', (chunk) => {
          resp_chunks.push(chunk);
        });

        proxyResp.on('end', () => {
          const resp_data = decrypt_response(resp_chunks.join());
          const {command} = resp_data;

          if (parsed_requests[command]) {
            // We have a complete request/response pair
            const req_data = parsed_requests[command];

            // Emit events, one for the specific API command and one for all commands
            self.emit(command, req_data, resp_data);
            self.emit('apiCommand', req_data, resp_data);
            delete parsed_requests[command];
          }
        });
      }
    });

    this.httpServer = http.createServer((req, resp) => {
      // Request has been intercepted from game client
      let req_chunks = [];
      if (req.url.indexOf('qpyou.cn/api/gateway_c2.php') >= 0) {
        req.on('data', (chunk) => {
          req_chunks.push(chunk);
        });
        req.on('end', () => {
          // Parse the request
          const req_data = decrypt_request(req_chunks.join());
          const {command} = req_data;

          // Add command request to an object so we can handle multiple requests at a time
          parsed_requests[command] = req_data;
        });
      }

      this.proxy.web(req, resp, { target: req.url, prependPath: false });
    }).listen(port);

    this.log({ type: 'info', source: 'proxy', message: `Now listening on port ${port}` })
  }

  stop() {
    this.proxy.close();
    this.httpServer.close();
    this.log({ type: 'info', source: 'proxy', message: `Proxy stopped` })
  }

  isRunning() {
    if (this.httpServer && this.httpServer.address()) {
      return true;
    }
    return false;
  }

  log(entry) {
    if (!entry)
      return;

    entry.date = new Date().toLocaleTimeString();
    this.emit('logupdated', entry);
  }
}

module.exports = SWProxy;
