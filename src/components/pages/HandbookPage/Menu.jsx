import React, { Component } from "react";

class MenuHandbookPage extends Component {
	
	componentWillMount() {
		this.setState({
			opened: true,
			navigation: []
		});
	}

	componentDidMount() {
		const anchors = document.querySelectorAll('.handbook-page-anchor');
		const navigation = [...anchors].map(anchor => {
			return {
				label: anchor.outerText,
				link: `#${anchor.name}`
			}
		});
		this.setState({ navigation })
	}

  	render() {
    	return (
      	<div className="handbook__menu">
			<div className="toggle">
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div className="content">
				<div className="nav">
					<div className="title">Навигация по уроку</div>
					<div className="links">
						{
							(this.state.navigation || []).map(anchor=>{
								return (
									<div className="link" key={anchor.link}>
										<a href={anchor.link}>{anchor.label}</a>
									</div>
								)
							})
						}
					</div>
				</div>
			</div>
      	</div>);
  }
}

export default MenuHandbookPage;
