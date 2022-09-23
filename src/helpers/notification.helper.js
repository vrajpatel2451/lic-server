import axios from 'axios';
import request from 'request';
// import FCM from 'fcm-node'
// import fetchCall from 'node-fetch'

class FirebaseNotificationService {
    #server;
    constructor(){
        // const key = process.env.FCM_SERVER_KEY || '' 
        // this.#server = new FCM(key);
    }
    async sendNotification(token,title='Test Title',subtitle='Test Subtitle',type='1',id='id'){
        console.log('hhahahaaa');
        try {
            // const noti = {
            //     title:"Test Message Reminder",
            //     text:"Test Reminder 02 Desc"
            // }
            // const tokens = [
            //     'eHbOkah1R5-tt3_INGVm5C:APA91bEOeBnIYgBfmeDF78heXEnrXQcUxTa3-jV5j2DlmaOjaNOFZX5ZRkRI_8fuCfYEzLkzqpe3dp0SGv6lAWZqyYG2FwQtAgw3syESKdz_9Iu5yJAVa9Fc6WnYuH-TXQjMYHMHL4Pk'
            // ];
            // const body = {
            //     'notification':noti,
            //     'registration_ids':tokens
            // }
            const body = {
                "to":token,
                "notification":{
                    "body":subtitle,
                    "title":title,
                    "subtitle":subtitle,
                },
                "data":{
                    "type":type,
                    "id":id,
                }
            }
            console.log(process.env.FCM_SERVER_KEY);

            var reqObj = {
                // host: process.env.BINANCE_BASE_URL,
                uri: 'https://fcm.googleapis.com/fcm/send',
                method: 'POST',
                body:JSON.stringify(body),
                headers: {
                    'Authorization':'key='+process.env.FCM_SERVER_KEY || '',
                    'Content-Type':'application/json'
                }
            };

            // const res = await request.post('https://fcm.googleapis.com/fcm/send',
            // {body,headers:{
            //     'Authorization':'key='+process.env.FCM_SERVER_KEY || '',
            //     'Content-Type':'application/json'
            // }});
            // console.log('hahhahaha res',res.data);
            request(reqObj,(error,res)=>{
                // if(error) response.internalServerError();
                if(error){
                    console.log(error);
                }
                console.log(res.body);
                // const data = 'JSON.parse(res.body)?.data'
                // const data = JSON.parse(res.body)
                // return response.ok(data);
            });
        } catch (error) {
            console.log('hhahahha err',error.message);
        }
        // const message = {
        //     to:'/topics/hi',
        //     notification: {
        //       title: '850',
        //       body: '2:45'
        //     },
        //     token: 'eHbOkah1R5-tt3_INGVm5C:APA91bEOeBnIYgBfmeDF78heXEnrXQcUxTa3-jV5j2DlmaOjaNOFZX5ZRkRI_8fuCfYEzLkzqpe3dp0SGv6lAWZqyYG2FwQtAgw3syESKdz_9Iu5yJAVa9Fc6WnYuH-TXQjMYHMHL4Pk'
        //   };
        // this.#server.send(message,(err,res)=>{
        //     if(err){
        //         console.log(err);
        //     }
        //     console.log(res);
        // });
    }
}

export default FirebaseNotificationService;