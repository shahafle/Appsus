import { AppHeader } from '../cmps/AppHeader.jsx';


export class About extends React.Component {



    render() {
        return (
            <section className="about">
                <AppHeader />
                <div className="about-container main-layout">
                    <h2 className="about-title">About us</h2>
                    <p>Trinity is an Israeli based company, at two main locations in Israel, Bat-Yam and Tel-Aviv-Yafo.
                        The company started as a project between two friends but grew exponentially beyond the team expectation.
                        Trinity is a 3 way Communication, Notes, and store platform that allows it users to always keep in touch with family, friends
                        and co-workers while keeping notes of that same conversations!
                    </p>
                    <div className="about-grid-container">
                        <div><i className="far fa-sticky-note fa-5x"></i>
                            <h2>Notes</h2>
                            <p>Capture what's on your mind
                                Add notes, lists, photos, and todo's to keep!
                                Need to remember to pick up some groceries? or finish a to-do? with Trinity keep we make sure you never miss a thing.
                                Quickly filter and search for notes by name or just the content and Find what you're looking for even faster!
                                Keep works on your phone, tablet and computer so your important stuff is always with you.
                            </p>
                        </div>
                        <div><i className="far fa-envelope fa-5x"></i>
                            <h2>eMail's </h2>
                            <p>Communicate with family, friends, loved one's and and co-workers anytime, anywhere!
                                with Trinity mail's your never gonna be to far and always in reach.
                                our online mail service is secured with the latest "TCFKM" VPN async security system, designed to be ultra secure
                                while keeping it user friendly!
                                providing auto email saves as Draft so you'll never lose a piece if valuable information!
                            </p>
                        </div>
                        <div><i className="fas fa-book fa-5x"></i>
                            <h2>Online Book Shopping</h2>
                            <p>Amazon?! Bookify?! NO! we are proud to present Trinity Books!
                                Highly rated online book shopping with the widest book selection of books known to man
                                with out 5 star rated costumer service and sixth times consecutive award wining fast shipping system, that delivers you choice
                                of book within 12 from ordering!
                            </p>
                        </div>
                    </div>
                    <div className="rating-container flex column align-center justify-center">
                        <div className="about-award-rate flex column align-center justify-center">
                            <h1>Five times consecutive winner of the </h1>
                            <h2>"Best UI UX APP"</h2>
                            <p>by: "Technology's Magazine"</p>
                        </div>

                        <div className="about-stars-container ">
                            <span>"</span>
                            <i className="fas fa-star about-star-rating"></i>
                            <i className="fas fa-star about-star-rating"></i>
                            <i className="fas fa-star about-star-rating"></i>
                            <i className="fas fa-star about-star-rating"></i>
                            <i className="fas fa-star about-star-rating"></i>
                            <span>"</span>
                        </div>

                    </div>


                    <section className="managers-info flex row space-between">
                        <div className="about-info-container-elad flex column align-center justify-center">
                            <h3> Elad Ayal</h3>
                            <h4>Trinity CFO</h4>
                            <p>“It's a dangerous business, going out your door. You step onto the road, and if you don't
                                keep your feet, there's no knowing where you might be swept off to.” — Frodo ("The Lord of the Rings”)</p>
                            <img className="about-img" src="assets/img/elad.jpg" alt="" />
                        </div>
                        <div className="about-info-container-elad flex column align-center justify-center">
                            <h3> Shahaf Levi</h3>
                            <h4>Trinity CEO</h4>
                            <p>"The path to succsess is never easy, but those who give up trying will never get there"</p>
                            <img className="about-img" src="assets/img/shahaf.jpg" alt="" />
                        </div>
                    </section>


                </div>

            </section>







        )




    }

}