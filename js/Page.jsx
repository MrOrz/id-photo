var React = require('react'),
    BarCode = require('./BarCode.jsx'),
    Pin = require('./Pin.jsx'),
    utility = require('./utility');

module.exports = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    rocid: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    mobile: React.PropTypes.string.isRequired,
    userId: React.PropTypes.string.isRequired,
    birthday: React.PropTypes.array
  },

  render() {

    var pinContent;

    if (utility.isBirthdayFormatCorrect(this.props.birthday)) {
      pinContent = <Pin birthday={this.props.birthday} />
    } else {
      pinContent = (
        <p>
          卡片密碼預設為持卡人民國出生年月日共 6 碼。例如：生日為 73 年 12 月 31 日，卡片密碼預設為 <code>731231</code>。
        </p>
      );
    }

    var timeStr = (new Date).toLocaleString();

    return (
      <div className="Page">
        <p className="Page-printTime">列印時間：{timeStr}</p>

        <table className="Page-table">
          <thead>
            <tr>
              <th colSpan="2">自然人憑證申請資料表</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>姓名</th>
              <td>{this.props.name}</td>
            </tr>
            <tr>
              <th>身分證字號</th>
              <td><BarCode code={this.props.rocid} /></td>
            </tr>
            <tr>
              <th>E-mail</th>
              <td><BarCode code={this.props.email} /></td>
            </tr>
            <tr>
              <th>行動電話</th>
              <td><BarCode code={this.props.mobile} /></td>
            </tr>
            <tr>
              <th>用戶代碼</th>
              <td>
                <BarCode code={this.props.userId} />
                <p className="Page-tableNote">* 憑證中心與戶政事務所並無留存您的用戶代碼，請妥善保存。</p>
              </td>
            </tr>
            <tr>
              <th>PIN 碼</th>
              <td>
                {pinContent}
                <p className="Page-tableNote">* 憑證中心與戶政事務所並無留存您的 PIN 碼，請妥善保存。</p>
              </td>
            </tr>
          </tbody>
        </table>

        <h2>請確認您已了解以下事項：</h2>

        <ul>
          <li>申辦自然人憑證時，需本人攜帶身分證正本前往戶政事務所辦理，並酌收 IC 卡工本費用 250元。</li>
          <li>使用自然人憑證 IC 卡進行網路業務申辦查詢時，需搭配「可上網之電腦設備」及「IC 智慧卡 讀卡機」。</li>
          <li>內政部憑證管理中心將使用您所留之連絡資料，發送自然人憑證相關訊息及活動資訊給您，連絡之E-MAIL 信箱如有變更，請至本憑證管理中心專屬網站進行「修改連絡用電子信箱」。</li>
          <li>為增加憑證流通與安全郵件使用之便利性，將預設憑證為公佈狀態，並將 E-mail 信箱寫入於憑證之中。用戶如欲變更預設狀態，可請戶所承辦人員協助辦理。</li>
          <li>「智慧自然人 悠遊e世代」小冊子內含重要資料，請自行妥善保管。</li>
        </ul>
      </div>
    );
  }
});

function padWith0(str){
  str = "" + str;
  while(str.length < 2) {
    str = "0" + str;
  }

  return str;
}
