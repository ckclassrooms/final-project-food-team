import { Button } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import React, { Component } from 'react';

class BtnCellRenderer extends Component {
  constructor(props) {
    super(props);
    this.btnClickedHandler = this.btnClickedHandler.bind(this);
  }
  btnClickedHandler() {
    this.props.clicked(this.props.value);
  }
  render() {
    return (
      <Button onClick={this.btnClickedHandler} variant="contained" startIcon={<CheckCircle />} color="success" >
        Choose this store
      </Button>
    )
  }
}
export default BtnCellRenderer