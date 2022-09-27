import Agenda from "agenda";
import FirebaseNotificationService from "./notification.helper";

class MyScheduler {
    agenda;
    #notificationServise
    constructor(){
        this.agenda = new Agenda({db:process.env.MONGODB_URI || ''});
        this.#notificationServise = new FirebaseNotificationService();
        this.#defineTaskScheduler();
    }
    #defineTaskScheduler(){
        this.agenda.define('task reminder', {priority: 'high', concurrency: 10},async (job, done) => {
            const {token,title,subtitle,type,id} = job.attrs.data;
            await this.#notificationServise.sendNotification(token,title,subtitle,type,id);
            // emailClient.send({
            //   to,
            //   from: 'example@example.com',
            //   subject: 'Email Report',
            //   body: '...'
            // }, done);
          });
    }
}

export default MyScheduler;