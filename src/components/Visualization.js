import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeaderRaw from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import * as actions from '../store/actions';
import Map from './Map';

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main,
    margin: '10px'
  },
  title: {
    color: 'white'
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
  card: {
    margin: '5% 25%'
  }
};

class Visualization extends Component {
  state = {
    date: ''
  };
  componentDidMount() {
    this.props.startPooling();
    this.today();
  }

  xAxisTickFormatter(date) {
    let d = new Date(date);
    return d.toLocaleTimeString();
  }

  today() {
    let today = new Date();

    this.setState({ date: today.toDateString() });
  }
  render() {
    const { classes, data } = this.props;
    console.log(data);

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Card>
              <CardHeader title="Drone Temp Variation" />
              <CardContent>
                {data.length ? (
                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 30,
                      bottom: 50
                    }}
                  >
                    <Line type="monotone" dataKey="metric" stroke="#78002e" />
                    <CartesianGrid strokeDasharray="5 5" />
                    <YAxis
                      domain={[201, 350]}
                      label={{ position: 'insideLeft', value: 'Temperature(F)', angle: -90, dy: -10 }}
                    />
                    <XAxis dataKey="timestamp" tickFormatter={this.xAxisTickFormatter} />
                    <Tooltip />
                  </LineChart>
                ) : (
                  ''
                )}
                <Typography component="h2" variant="headline" gutterBottom>
                  {this.state.date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardHeader title="Drone Mobility" />
              <CardContent>
                {data.length ? (
                  <Map
                    lat={data[data.length - 1].latitude}
                    lng={data[data.length - 1].longitude}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAD7ny28wAMKhvVpkUcbAxrMct1g1eSRE&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                ) : (
                  ' '
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { fetching, polling, data, error } = state.drone;
  return {
    fetching,
    polling,
    data,
    error
  };
};

const mapDispatchToProps = dispatch => ({
  startPooling: () =>
    dispatch({
      type: actions.POLLING_START
    })
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Visualization)
);
