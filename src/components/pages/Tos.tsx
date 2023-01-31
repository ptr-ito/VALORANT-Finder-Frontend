import { Box, Typography, Grid } from "@mui/material";
import { css } from "@emotion/react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const Tos = () => {
  return (
    <>
      <Box sx={{ width: 900 }}>
        <Grid container justifyContent="center" alignItems="center">
          <Typography variant="h4" sx={{ mb: 7 }}>
            利用規約
          </Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="start">
          <Typography sx={{ mb: 5 }}>
            この利用規約（以下、「本規約」といいます）は、VALORANT FINDERの運営者（以下、「当方」という）がこのウェブサイト上で提供するサービス「VALORANTFINDER」（以下、「本サービス」といいます）
            の利用条件を定めるものです。 登録ユーザーの皆さま（以下、「ユーザー」といいます）には、本規約に従って、本サービスをご利用いただきます
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>
            第1条（適用）
          </Typography>
          <Box sx={{ mb: 3 }}>
            <ol css={position}>
              <li>本規約は，ユーザーと当方との間の本サービスの利用に関わる一切の関係に適用されるものとします。</li>
              <li>
                本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。
                これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
              </li>
              <li>本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。</li>
            </ol>
          </Box>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            第2条（利用登録）
          </Typography>
          <Typography sx={{ mb: 3 }}>
            本サービスにおいては，登録希望者が本規約に同意の上，当社の定める方法によって利用登録を申請し，当サイトがこの承認を登録希望者に通知することによって，利用登録が完了するものとします。
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            第3条（ユーザーIDおよびパスワードの管理）
          </Typography>
          <Box sx={{ mb: 3 }}>
            <ol css={position}>
              <li>ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを適切に管理するものとします。</li>
              <li>
                ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することはできません。
                当方は、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。
              </li>
              <li>ユーザーID及びパスワードが第三者によって使用されたことによって生じた損害は、当方に故意又は重大な過失がある場合を除き、当方は一切の責任を負わないものとします。</li>
            </ol>
          </Box>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            第4条（禁止事項）
          </Typography>
          <Typography sx={{ mb: 3 }}>ユーザーは本サービスの利用にあたり、以下の行為をしてはなりません。</Typography>
          <Box sx={{ mb: 3 }}>
            <ol css={listMargin}>
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>当方、本サービスの他のユーザー、または第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
              <li>サービスの運営を妨害するおそれのある行為</li>
              <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
              <li>不正アクセスをし、またはこれを試みる行為</li>
              <li>他のユーザーに成りすます行為</li>
              <li>本サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
              <li>当方、本サービスの他のユーザーまたは第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為</li>
              <li>一人の利用者が、複数の利用者IDを取得する行為</li>
              <li>上記の他、管理者が不適切と判断する行為</li>
            </ol>
          </Box>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            第5条（本サービスの提供の停止等）
          </Typography>
          <Box sx={{ mb: 3 }}>
            <ol css={position}>
              <li>以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全てまたは一部の提供を停止または中断することができるものとします。</li>
              <ul css={position}>
                <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                <li>その他、本サービスの提供が困難と判断された場合</li>
              </ul>
            </ol>
          </Box>
          <Typography sx={{ mb: 3 }}>2. 本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。</Typography>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            第6条（著作権）
          </Typography>
          <Box sx={{ mb: 3 }}>
            <ol css={position}>
              <li>
                ユーザーは、自ら著作権等の必要な知的財産権を有するか、または必要な権利者の許諾を得た文章、画像や映像等の情報に関してのみ、
                本サービスを利用し、投稿ないしアップロードすることができるものとします。
              </li>
              <li>
                ユーザーが本サービスを利用して投稿ないしアップロードした文章、画像、映像等の著作権については、当該ユーザーその他既存の権利者に留保されるものとします。
                ただし、当方は、本サービスを利用して投稿ないしアップロードされた文章、画像、映像等について、本サービスの改良、品質の向上、
                または不備の是正等ならびに本サービスの周知宣伝等に必要な範囲で利用できるものとし、ユーザーは、この利用に関して、著作者人格権を行使しないものとします。
              </li>
              <li>
                前項本文の定めるものを除き、本サービスおよび本サービスに関連する一切の情報についての著作権およびその他の知的財産権はすべて当方または当方にその利用を許諾した権利者に帰属し、
                ユーザーは無断で複製、譲渡、貸与、翻訳、改変、転載、公衆送信（送信可能化を含みます。）、伝送、配布、出版、営業使用等をしてはならないものとします。
              </li>
            </ol>
          </Box>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            第7条（利用制限および登録抹消）
          </Typography>
          <Box sx={{ mb: 3 }}>
            <ol css={position}>
              <li>
                当方は、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、
                投稿データを削除し、ユーザーに対して本サービスの全部もしくは一部の利用を制限しまたはユーザーとしての登録を抹消することができるものとします。
              </li>
              <ul css={position}>
                <li>本規約のいずれかの条項に違反した場合</li>
                <li>その他、当方が本サービスの利用を適当でないと判断した場合</li>
              </ul>
              <li>当方は、本条に基づき当方が行った行為によりユーザーに生じた損害について、一切の責任を負いません。</li>
            </ol>
          </Box>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            第8条（保証の否認および免責事項）
          </Typography>
          <ol css={position}>
            <li>
              当方は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）
              がないことを明示的にも黙示的にも保証しておりません。
            </li>
            <li>当方は、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。</li>
            <li>
              前項ただし書に定める場合であっても、当方は、当方の過失（重過失を除きます）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害
              （当方またはユーザーが損害発生につき予見し、または予見し得た場合を含みます）について一切の責任を負いません。
            </li>
            <li>当方は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。</li>
          </ol>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            第9条（サービス内容の変更等）
          </Typography>
          <Typography sx={{ mb: 3 }}>
            当方は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし 、 これによってユーザーに生じた損害について一切の責任を負いません。
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            第10条（利用規約の変更）
          </Typography>
          <Typography sx={{ mb: 3 }}>
            当方は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、
            本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            第11条（個人情報の取扱い）
          </Typography>
          <Typography sx={{ mb: 3 }}>当方は、本サービスの利用によって取得する個人情報については、当方「プライバシーポリシー」に従い適切に取り扱うものとします。</Typography>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            第12条（通知または連絡）
          </Typography>
          <Typography sx={{ mb: 3 }}>
            ユーザーと当方との間の通知または連絡は、当方の定める方法によって行うものとします。当方はユーザーから当方が別途定める方式に従った変更届け出がない限り、
            現在登録されている連絡先が有効なものとみなして、当該連絡先へ通知または連絡を行い、これらは発信時にユーザーへ到達したものとみなします。
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            第13条（準拠法・裁判管轄）
          </Typography>
          <ol css={position}>
            <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
            <li>本サービスに関して紛争が生じた場合には、当方所在地を管轄する裁判所を専属的合意管轄とします。</li>
          </ol>
        </Grid>
        <Typography sx={{ mt: 7, textAlign: "right" }}>2023年1月31日制定</Typography>
      </Box>
    </>
  );
};

export default Tos;

// css

const whiteSpace = css`
  white-space: pre-wrap;
`;

const indent = css`
  text-indent: 1em;
`;

const position = css`
  margin-left: 20px;
`;

const listMargin = css`
  margin-left: 30px;
`;
