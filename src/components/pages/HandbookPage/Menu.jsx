import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

class MenuHandbookPage extends Component {
	state = {
		opened: true,
		navigation: []
	};

	componentDidMount() {
		if (document.body.offsetWidth < 920) this.toggleMenu();
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
			<>
			    <div className="nav">
					<div className={"nav_prev" + (!this.state.opened ? '  --closed' : ' --opened')}>
						<Link to="/#"> 
							<div className="icon">
								<FontAwesomeIcon icon={faAngleLeft} />
							</div>
						</Link>
					</div>
					<div className={"nav_next" + (!this.state.opened ? '  --closed' : ' --opened')}>
						<Link to="/#"> 
							<div className="icon">
								<FontAwesomeIcon icon={faAngleRight} />
							</div>
						</Link>
					</div>
				</div>
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
			</>
		);
	}
}

export default MenuHandbookPage;
