import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { toggleTabBarAction } from '../../Redux/Actions';
import connectWithNavigationIsFocused from '../../Utils/NavigationIsFocused';
import moment from 'moment';
import { Colors, Metrics, ApplicationStyles, px2dp } from '../../Themes';
import { ChartBoard, DiaryBoard } from '../../Components';

class MyDiaryScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: '首页',
    tabBarVisible: true,
    ...ApplicationStyles.defaultHeaderStyle,
  });

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      this.onFocus();
    }
    if (this.props.isFocused && !nextProps.isFocused) {
      this.onBlur();
    }
  }

  onFocus() {
    this.props.toggleTabBarAction(true);
  }

  onBlur() {
    // this.props.toggleTabBarAction(false);
  }

  render() {
    const { navigate } = this.props.navigation;
    const today = moment(new Date()).format('YYYY-MM-DD');
    return(
      <View>
        <ChartBoard
          data={[]}
          style={{
            marginBottom: 15,
            marginLeft: 7.5,
            marginRight: 7.5,
            marginTop: 10,
            borderRadius: 6,
            shadowColor: Colors.CB,
            shadowOffset: { height: 5, width: 0 },
            shadowRadius: 3,
            shadowOpacity: 0.4,
          }}
          title="今日消费"
          day={today}
          onPress={() => {
            navigate('myDiaryItem');
          }}
        />
        <DiaryBoard
          name="diary"
          area="周"
          day={'11'}
          number={4}
          style={{
            marginBottom: 15,
            marginLeft: 7.5,
            marginRight: 7.5,
            shadowColor: '#298eff',
            shadowOffset: { height: 5, width: 0 },
            shadowRadius: 3,
            shadowOpacity: 0.4,
          }}
          onPress={() => navigate('myDiaryItem')}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
    navigationState: state.tabMyDiary,
});

export default connectWithNavigationIsFocused(
  mapStateToProps,
  {
    toggleTabBarAction,
  },
  'tabMyDiary',
  'mainTab',
  0,
)(MyDiaryScreen);