import { Box, Typography, Grid } from "@mui/material";
import { css } from "@emotion/react";

const PrivacyPolicy = () => {
  return (
    <>
      <Box sx={{ width: 900 }}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Typography variant="h4" sx={{ mb: 7 }}>
            プライバシーポリシー
          </Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="start">
          <Typography sx={{ mb: 5 }}>
            VALORANT FINDERの運営者（以下、「当方」という）は、ユーザーの個人情報について以下のとおりプライバシーポリシー（以下、「本ポリシー」という）を定めます。
            本ポリシーは、当方がどのような個人情報を取得し、どのように利用・共有するか、ユーザーがどのようにご自身の個人情報を管理できるかをご説明するものです。
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>
            1. お客様から取得する情報
          </Typography>
          <Typography sx={{ mb: 3 }}>当サイトは、お客様から以下の情報を取得します。</Typography>
          <li>氏名(ニックネームやペンネームも含む)</li>
          <li>メールアドレス</li>
          <li>外部サービスでお客様が利用するID、その他外部サービスのプライバシー設定によりお客様が連携先に開示を認めた情報</li>
          <li>Cookie(クッキー)を用いて生成された識別情報</li>
          <li>当サイトの滞在時間、入力履歴、購買履歴等の当サイトにおけるお客様の行動履歴</li>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            2. お客様の情報を利用する目的
          </Typography>
          <Typography sx={{ mb: 3 }}>当サイトは、お客様から取得した情報を以下の目的のために利用します。</Typography>
          <li>当サイトサービスに関する登録の受付、お客様の本人確認、認証のため</li>
          <li>お客様の当サイトサービスの利用履歴を管理するため</li>
          <li>当サイトサービスにおけるお客様の行動履歴を分析し、当社サービスの維持改善に役立てるため</li>
          <li>お客様からのお問い合わせに対応するため</li>
          <li>当サイトの規約や法令に違反する行為に対応するため</li>
          <li>当サイトの変更、提供中止、終了、契約解除をご連絡するため</li>
          <li>当サイト規約の変更等を通知するため</li>
          <li>以上の他、当サイトサービスの提供、維持、保護及び改善のため</li>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            3. 安全管理のために講じた措置
          </Typography>
          <Typography sx={{ mb: 3 }}>
            当サイトが、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、法令の定めに従い個別にご回答させていただきます。
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            4. 第三者提供
          </Typography>
          <Typography sx={{ mb: 3 }}>
            当サイトは、お客様から取得する情報のうち、個人データ（個人情報保護法第２条第６項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。
            但し、次の場合は除きます。
          </Typography>
          <li>個人データの取扱いを外部に委託する場合</li>
          <li>当サイトが買収された場合</li>
          <li>事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）</li>
          <li>その他、法律によって合法的に第三者提供が許されている場合</li>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            5. アクセス解析ツール
          </Typography>
          <Typography sx={{ mb: 3 }}>
            当社は、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは以下からご確認ください。
          </Typography>
          <Typography component="a" href="https://marketingplatform.google.com/about/analytics/terms/jp" target="_blank" rel="noopener noreferrer">
            https://marketingplatform.google.com/about/analytics/terms/jp/
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            6. プライバシーポリシーの変更
          </Typography>
          <Typography sx={{ mb: 3 }}>
            当サイトは、必要に応じてこのプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, mt: 5 }}>
            7. お問い合わせ
          </Typography>
          <Typography sx={{ mb: 3 }}>お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、お問合せフォームまたは以下のメールアドレスにご連絡ください。</Typography>
          <Typography component="p" css={whiteSpace}>
            e-mail {`\n`}
            {`\n`}
          </Typography>
          <Typography component="p" css={indent}>
            support@valorantfidner.com
          </Typography>
        </Grid>
        <Typography sx={{ mt: 7, textAlign: "right" }}>2023年1月31日制定</Typography>
      </Box>
    </>
  );
};

export default PrivacyPolicy;

// css

const whiteSpace = css`
  white-space: pre-wrap;
`;

const indent = css`
  text-indent: 1em;
`;
