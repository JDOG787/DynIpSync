import 'dotenv/config'
import Bree from 'bree';
import Cabin from 'cabin'; 

const bree = new Bree({
    logger: new Cabin(),
    jobs: [
        {
            name: "update-ip",
            interval: "5m"
        }
    ]
})

bree.start();