import { AppHeader } from '../cmps/AppHeader.jsx';


export class Home extends React.Component {

    render() {
        return (
            <section className="main-layout ">
                <AppHeader app='home' />
                <div className="flex column align-center">
                <section className="home-hero space-around flex">
                <div className="home-container  flex column justify-center align-center">
                <div className="hero-title">Welcome to Trinity</div>
                <div className="hero-subtitle">A Triforce Application</div>
                <div className="hero-slogan">Providing Online Notes and Mail services since 2021</div>
                </div>
            </section>
                </div>

                
            </section>
        )
    }
}