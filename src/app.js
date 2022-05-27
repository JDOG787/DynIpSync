import 'dotenv/config'
import schedule from 'node-schedule';
import update from './update-ip.js';
// import Bree from 'bree';
// import Cabin from 'cabin'; 

// const bree = new Bree({
//     logger: new Cabin(),
//     jobs: [
//         {
//             name: "update-ip",
//             interval: "5m"
//         }
//     ]
// })

// bree.start();

const job = schedule.scheduleJob('*/1 * * * *', function(){
    update()
});