const http = require('http');
const url = require('url');
const queryString = require('query-string');
const fs = require('fs');



const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  var resposta;
  // Criar um usuario
  const urlParse = url.parse(req.url, true);
  // receber info
  const params = queryString.parse(urlParse.search);

  // salvar info ou Atualizar

  if (urlParse.pathname == '/criar-usuario') {
    fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
      if (err) throw err;
      console.log('Saved!');
      resposta = 'Usuário criado com sucesso';
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);

    });
  }   
  // Selecionar
  else if (urlParse.pathname == '/selecionar-usuario') {
    fs.readFile('users/' + params.id + '.txt', function (err, data) {
      resposta = data;
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta);
    });
  }

  // Remover
  else if (urlParse.pathname == '/remover-usuario') {
    fs.unlink('users/' + params.id + '.txt', function (err, data) {
      resposta = 'Usuário Removido';
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta);

      // resposta = 'Usuário criado com sucesso';
    });
  }

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});