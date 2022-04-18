import React, { Component } from "react"
import { FormGroup, Input, Label, Tooltip } from "reactstrap"

interface IPlayerAiCheckboxProps {
    readonly playerNumber: 1 | 2
}
interface IPlayerAiCheckboxState {
    checked: boolean
    showTooltip: boolean
}

export default class PlayerAiCheckbox extends Component<IPlayerAiCheckboxProps, IPlayerAiCheckboxState> {
    public constructor(props: IPlayerAiCheckboxProps) {
        super(props)
        this.state = {
            checked: false,
            showTooltip: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.toggleTooltip = this.toggleTooltip.bind(this)
    }
    public render() {
        return (
            <FormGroup check={true}>
                <Label check={true} id={`p${this.props.playerNumber}AICheck`}>
                    <Input type="checkbox" checked={this.state.checked} onChange={this.handleChange} />
                    AI Player
                </Label>
                <Tooltip
                    target={`p${this.props.playerNumber}AICheck`}
                    isOpen={this.state.showTooltip}
                    placement="bottom"
                    toggle={this.toggleTooltip}
                >
                    When checked, this player will be controled by the computer
                </Tooltip>
            </FormGroup>
        )
    }
    private handleChange(event: any): void {
        this.setState({
            checked: event.target.checked,
        })
    }
    private toggleTooltip(): void {
        this.setState((prevState) => ({ showTooltip: !prevState.showTooltip }))
    }
}
