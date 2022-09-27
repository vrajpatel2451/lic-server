import request from 'request';

class FirebaseNotificationService {
    constructor(){
    }
    async sendNotification(token,title='Test Title',subtitle='Test Subtitle',type='1',id='id'){
        console.log('hhahahaaa');
        try {
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
                uri: 'https://fcm.googleapis.com/fcm/send',
                method: 'POST',
                body:JSON.stringify(body),
                headers: {
                    'Authorization':'key='+process.env.FCM_SERVER_KEY || '',
                    'Content-Type':'application/json'
                }
            };
            request(reqObj,(error,res)=>{
                if(error){
                    console.log(error);
                }
                console.log(res.body);
            });
        } catch (error) {
            console.log('hhahahha err',error.message);
        }
    }
}

export default FirebaseNotificationService;