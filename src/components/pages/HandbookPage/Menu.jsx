import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
class MenuHandbookPage extends Component {
	state = {
		opened: true,
		navigation: []
	};

	componentDidMount() {
		const anchors = document.querySelectorAll(".handbook-page-anchor");
		const navigation = [...anchors].map(anchor => {
			return {
				label: anchor.outerText,
				link: `#${anchor.name}`
			};
		});
		this.setState({ navigation });
	}

	toggleMenu = () => {
		this.setState({
			opened: !this.state.opened
		});
	}

	render() {
		return (
			<aside className={"aside" + (!this.state.opened ? ' --closed' : '')}>
				<div className="handbook__menu">
					<div className="toggle">
						<button onClick={this.toggleMenu}>
							<FontAwesomeIcon icon={faBars} />
						</button>
					</div>
					<div className="content">
						<div className="nav">
							<div className="title">Навигация по уроку</div>
							<div className="links">
								{(this.state.navigation || []).map(anchor => {
									return (
										<div className="link" key={anchor.link}>
											<a href={anchor.link}>{anchor.label}</a>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</aside>
		);
	}
}

export default MenuHandbookPage;
