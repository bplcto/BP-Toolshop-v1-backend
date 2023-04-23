const User = require('../models/User');
const Cpanel = require('../models/Cpanel');
const Method = require('../models/Method');
const PhpMailer = require('../models/PhpMailer');
const ProgramScript = require('../models/ProgramScript');
const PremiumShop = require('../models/PremiumShop');
const Rdps = require('../models/Rdps');
const Shell = require('../models/Shell');
const Smtp = require('../models/Smtp');
const Vps = require('../models/Vps');
const Lead = require('../models/lead');

const service = async (req, res) => {
  try {
    const UserCnt = await User.countDocuments();
    const CpanelCnt = await Cpanel.countDocuments();
    const MethodCnt = await Method.countDocuments();
    const PhpMailerCnt = await PhpMailer.countDocuments();
    const ProgramScriptCnt = await ProgramScript.countDocuments();
    const RdpsCnt = await Rdps.countDocuments();
    const PremiumShopCnt = await PremiumShop.countDocuments();
    const ShellCnt = await Shell.countDocuments();
    const SmtpCnt = await Smtp.countDocuments();
    const VpsCnt = await Vps.countDocuments();
    const LeadCnt = await Lead.countDocuments();

    res.json({
      UserCnt,
      CpanelCnt,
      MethodCnt,
      PhpMailerCnt,
      ProgramScriptCnt,
      RdpsCnt,
      ShellCnt,
      SmtpCnt,
      VpsCnt,
      LeadCnt,
      PremiumShopCnt
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send({msg: "Server Error"});
  }
}

module.exports = {
  service
}
