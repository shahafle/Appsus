import { AppHeader } from '../cmps/AppHeader.jsx';


export class Home extends React.Component {

    render() {
        return (
            <section className="flex column home-page">
                <AppHeader app='home' />

                <div className="home-hero space-around flex main-layout">
                    <div className="home-container  flex column justify-center align-center">
                        <div className="hero-title">Welcome to Trinity</div>
                        <div className="hero-subtitle">Manage your success</div>
                        <div className="hero-slogan">Providing online notes and mail services since 2021</div>
                    </div>
                </div>



            </section>
        )
    }
}