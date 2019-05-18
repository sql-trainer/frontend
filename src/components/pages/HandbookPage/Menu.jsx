import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

class MenuHandbookPage extends Component {
	state = {
		opened: true
	};

	componentDidMount() {
		if (document.body.offsetWidth < 920) this.toggleMenu();
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
					{
						this.props.prevHandBookLink
							? (
								<div className={"nav_prev" + (!this.state.opened ? '  --closed' : ' --opened')}>
									<Link to={this.props.prevHandBookLink}>
										<div className="icon">
											<FontAwesomeIcon icon={faAngleLeft} />
										</div>
									</Link>
								</div>
							)
							: ""
					}
					{
						this.props.nextHandBookLink
							? (
								<div className={"nav_next" + (!this.state.opened ? '  --closed' : ' --opened')}>
									<Link to={this.props.nextHandBookLink}>
										<div className="icon">
											<FontAwesomeIcon icon={faAngleRight} />
										</div>
									</Link>
								</div>
							)
							: ""
					}
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
									{(this.props.navigationLinks || []).map(anchor => {
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

const mapStateToProps = ({
	handbookPage: {
		prevHandBookLink,
		nextHandBookLink,
		navigationLinks
	}
}) => {
	return {
		prevHandBookLink,
		nextHandBookLink,
		navigationLinks
	};
};

export default connect(mapStateToProps)(MenuHandbookPage);
