import Agenda from "agenda";
import FirebaseNotificationService from "./notification.helper";

class MyScheduler {
    agenda;
    #notificationServise
    constructor(){
        console.log(process.env.MONGODB_URI_N);
        this.agenda = new Agenda({ db: { address: process.env.MONGODB_URI_N || '', collection: "newNotification", options: { useUnifiedTopology: true } },});
        // this.agenda = new Agenda({db:process.env.MONGODB_URI || ''});
        this.#notificationServise = new FirebaseNotificationService();
        this.#defineTaskScheduler();
        this.agenda.on('ready',async()=>{
            await this.agenda.start();
        })
    }
    #defineTaskScheduler(){
        this.agenda.define('task reminder', {priority: 'high', concurrency: 10},async (job, done) => {
            const {isHeadExist,isStaffExist,admins,task} = job.attrs.data;
            if(admins){
                admins?.forEach(async e=>{
                    await new FirebaseNotificationService().sendNotification(e?.fcmToken,'Task Reminder','Please finish this task','1',task._id);
                });
            }
            if(isHeadExist){
                await new FirebaseNotificationService().sendNotification(isHeadExist?.fcmToken,'Task Reminder','Please finish this task','1',task._id);
            }
            if(isStaffExist){
                await new FirebaseNotificationService().sendNotification(isStaffExist?.fcmToken,'Task Reminder','Please finish this task','1',task._id);
            }
          });
    }
}

export default MyScheduler;