export class ColorInput extends React.Component {
    state = {
        isOpen: false
    }

    toggleInput = (ev) => {
        ev.stopPropagation()
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { onColorNote, noteId } = this.props
        const colors = ['#FFAEBC', '#d5e3d7', '#b2d8e5', '#FBE7C6', '#ececec']
        return <React.Fragment>
            <button className={`fas fa-palette color-input-btn ${(this.state.isOpen) ? 'input-open' : ''}`} onClick={ev => this.toggleInput(ev)}></button>
            <div className={`note-color-input flex ${(this.state.isOpen) ? '' : 'hidden'}`} >
                {colors.map(color => {
                    return <div
                        onClick={(ev) => {
                            onColorNote(ev, noteId, color)
                            this.toggleInput(ev)
                        }}
                        style={{ backgroundColor: color }}
                        key={color}
                        className="color-value"
                    >
                    </div>
                })}
            </div>
        </React.Fragment>
    }
}

