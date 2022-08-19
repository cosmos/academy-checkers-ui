import React, { Component, CSSProperties } from "react"

interface INameInputProps {
    className?: string
    color: "black" | "red"
    maxLength?: number
    onChange: (name: string) => void
    style?: CSSProperties
    turn: boolean
    defaultValue: string
}

interface INameInputState {
    value: string
}

export default class NameInput extends Component<INameInputProps, INameInputState> {
    public static getDerivedStateFromProps(props: INameInputProps, state: INameInputState): INameInputState {
        return {
            value: props.defaultValue,
        }
    }
    public readonly state: INameInputState = {
        value: this.props.defaultValue,
    }
    constructor(props: INameInputProps) {
        super(props)
        this.onBlur = this.onBlur.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    public componentWillUnmount() {
        // let the parent component know that the value has been changed
        this.props.onChange(this.state.value)
    }

    public render(): JSX.Element {
        return (
            <input
                className={this.props.className}
                maxLength={this.props.maxLength || 20}
                onBlur={this.onBlur}
                onChange={this.onChange}
                style={{
                    color: this.props.color,
                    fontStyle: this.props.turn ? "italic" : "normal",
                    ...this.props.style,
                }}
                value={this.state.value}
                type="text"
            />
        )
    }
    private onBlur() {
        this.props.onChange(this.state.value)
    }
    private onChange(e: any) {
        const validName = (name: string) =>
            !/<|>/g.test(name) && name.length > 0 && name.length < (this.props.maxLength || 20)

        const newName: string = e.target.value
        if (!validName(newName)) {
            return
        }
        this.setState({ value: newName })
    }
}
