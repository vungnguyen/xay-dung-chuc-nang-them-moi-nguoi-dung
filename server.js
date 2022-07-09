const http = require('http');
const fs = require('fs');
const qs = require('qs');
let userList = [];
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./views/register.html',(err, data) => {
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    }else{
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('end', () => {
            let userInfo = qs.parse(data);
            fs.readFile('./views/info.html','utf8', (err, dataHtml) => {
                if(err) {
                    console.log(err);
                }
                let list = '';
                userList.push(userInfo);
                userList.forEach((user,index) => {
                    list += `<tr>
                       <td>${1+index}</td>
                       <td>${user.name}</td>
                       <td>${user.email}</td>
                       <td>${user.phone}</td>
                       <td>${user.address}</td>
                       </tr>`
                })
                dataHtml = dataHtml.replace('{list}', list);
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(dataHtml);
                return res.end();
            })
        })
        req.on('error', function(err) {
            console.log(err);
        })
    }
})
server.listen(3000,() => {
    console.log('Server running at http://localhost:3000')
})
