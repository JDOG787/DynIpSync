import fs from 'fs';
import  {NodeSSH} from 'node-ssh';
import nginxConfig from './nginx.js';
import axios from 'axios';

export default async () => {


    const currentIp = await getIp();
    const ipBeingUsed = fs.readFileSync("data/USED_IP", "utf-8");

    if (ipBeingUsed === "") return fs.writeFileSync("data/USED_IP", currentIp);


    if (ipBeingUsed !== currentIp) {

        fs.writeFileSync("data/nginx.conf", nginxConfig(currentIp))


        const ssh = new NodeSSH()

        ssh.connect({
            host: process.env.VPS_HOST,
            username: process.env.VPS_USER,
            password: process.env.VPS_PASSWORD,
            tryKeyboard: true
        })
        .then(function() {
        //   // Local, Remote
            ssh.putFile(process.env.LOCAL_FILE_PATH, process.env.REMOTE_FILE_PATH).then(function() {
                ssh.execCommand("service nginx restart").then(function(result) {
                    console.log('STDOUT: ' + result.stdout)
                    console.log('STDERR: ' + result.stderr)
                    ssh.dispose()
                })
            }, function(error) {
                console.log("Something's wrong")
                console.log(error)
            })
        })

        fs.writeFileSync("data/USED_IP", currentIp)
    }
}

async function getIp() {
    const res = await axios.get('https://api.ipify.org');
    return res.data;
}