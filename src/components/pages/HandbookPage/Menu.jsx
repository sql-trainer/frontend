import React, { Component } from "react";

class MenuHandbookPage extends Component {
	
	componentDidMount() {
		this.setState({
			opened: true
		})
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
					{/* <a href="#">Введение в SQL</a>
					<a href="#">Введение в SQL</a> */}
				</div>
			</div>
      	</div>);
  }
}

export default MenuHandbookPage;
