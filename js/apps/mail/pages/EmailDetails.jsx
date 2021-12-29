
import { EmailService } from "../services/mail.service.js"

export class EmailDetails extends React.Component {

    state = {
       email:null,
    }


//     componentDidMount(){
//         this.loadEmail()
//     }

// loadEmail = () =>{

//     const {emailId} = this.props.match.params

// }


    render(){



        return(

            <section className="email-details">

                <div >THIS IS THE EMAIL PREVIEW</div>

            </section>

        )

    }


}