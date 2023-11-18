![profis](https://github.com/kitoken99/sns-application-front/assets/129636942/f5be980b-2cfa-4614-a86b-7dce38b4550e)

## サービス URL

下記の URL からアカウントを新規作成できます。

https://sns-application.vercel.app/register

また, テストアカウントを利用することで, お試しすることができます。

https://sns-application.vercel.app/login

アカウント 1

email: test@email.com

password: 11111111

アカウント 2

email: test1@email.com

password: 11111111

！注意 上記のアカウントはテストアカウントのため, email と password の変更を行う際は再度、上記の email と password に戻すようお願いいたします。

## サービスの背景

私は現在、他の人との連絡手段として、Line や Slack などのチャットツールを日常的に利用しています。これらのツールを利用している中で、友人用や業務用など複数のアカウントを持つことがあります。複数のアカウントを持つことで、相手に合わせた自分のプロファイルを表示で来る反面、アカウントの切り替えであったり管理が手間になるデメリットが存在します。

このプロダクトはユーザーが複数のアカウントを、簡単に、より快適に管理できるようにしたいという想いから生まれました。

現在は複数のアカウントを保持し、他のユーザーとチャットができるのみですが、機能追加を重ねて、チャットツールとしての完成度を高めることを目標としています。

## 活用方法

ユーザー登録時に main のアカウントが作成されます。このアカウントはすべてのユーザーに対して表示されるアカウントになります。また、サブアカウントを含めすべての情報が main アカウントに表示されます。よって他のアカウントの友達に対する操作もこのアカウントから行えます。

サブアカウントを作成し，そのアカウントで友人登録することで，あなたの友達はこのアカウントのプロフィールを主に参照することになります。業務用や友達用のアカウントを作成することで、相手に応じたプロフィールを作成することができます。

## 仕様技術

### フロントエンド

- HTML
- CSS
- vue3
- quasar

### バックエンド

- PHP
- Laravel
- PsotgreSQL
- composer

### その他

- Git/GitHub

## 画面一覧

<table>
<tr>
<th>login画面</th><th>register画面</th>
</tr>
<td><img width="950" alt="login" src="https://github.com/kitoken99/sns-application-front/assets/129636942/3f59e08d-c4f3-42cf-8e87-a2b2b6f104ba"></td>
<td><img width="950" alt="login" src="https://github.com/kitoken99/sns-application-front/assets/129636942/2254bbe5-4cb4-4641-921d-85eaa2f99f34"></td>
</tr>
</table>
<table>
<tr>
<th>友達一覧画面</th><th>プロフィール画面</th>
</tr>
<td><img width="950" alt="login" src="https://github.com/kitoken99/sns-application-front/assets/129636942/cd496c84-369a-47d6-8004-d337c8cb796a"></td>
<td><img width="950" alt="login" src="https://github.com/kitoken99/sns-application-front/assets/129636942/80fbf0bb-684a-41d0-b050-2d7c26a3c6b2"></td>
</tr>
</table>
<table>
<tr>
<th>ルーム一覧画面</th><th>ルーム画面</th>
<tr>
<td><img width="950" alt="login" src="https://github.com/kitoken99/sns-application-front/assets/129636942/7bb1b14c-1a04-47f5-bba7-0f0219a9d223"></td>
<td><img width="950" alt="login" src="https://github.com/kitoken99/sns-application-front/assets/129636942/88a86698-e3e4-40cb-9de2-d5e3fd3ff980"></td>
</tr>
</table>
<table>
<tr>
<th>ユーザーセッティング画面</th><th>フレンドセッティング画面</th>
<tr>
<td><img width="950" alt="login" src="https://github.com/kitoken99/sns-application-front/assets/129636942/2bba1f9d-c505-4b2d-ba7f-8d25fc055337"></td>
<td><img width="950" alt="login" src="https://github.com/kitoken99/sns-application-front/assets/129636942/1db9e30b-b445-41e0-b8c2-cb578d104192"></td>
</tr>
</table>
<table>
<tr>
<th>プロフィール作成画面</th><th>プロフィール編集画面</th>
<tr>
<td><img width="950" alt="login" src="https://github.com/kitoken99/sns-application-front/assets/129636942/79955470-499f-44ae-9adb-51dab1e88af6"></td>
<td><img width="950" alt="login" src="https://github.com/kitoken99/sns-application-front/assets/129636942/58ae4023-7f8c-4aa6-bb3f-ba718baf8c3d"></td>
</tr>
</table>

## 今後の実装予定

すべてのモデルに対して CRUD 処理の実装

デザインの修正

他人のデータ(メッセージ以外)の同期

モバイルアプリへの対応
