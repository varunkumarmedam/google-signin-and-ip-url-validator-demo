import { Client, Account } from "appwrite";
import { GoogleLoginButton, GithubLoginButton, FacebookLoginButton } from "react-social-login-buttons";
import BubbleText from "../components/BubbleText";

export default function Login() {

    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1') // API Endpoint
        .setProject('dummy');
    const account = new Account(client);

    const singIn = (type) => {
        // Navigates to respective OAuth Screen
        account.createOAuth2Session(type, 'http://localhost:3000', 'http://localhost:3000');
    }

    return <>
        <div className="login-page-bg">
            <div className="social-media-login-box">
                <BubbleText title={'SIGN-IN'} />
                <GoogleLoginButton onClick={() => singIn("google")} />
                <GithubLoginButton onClick={() => singIn("github")} />
                {/* <FacebookLoginButton onClick={() => singIn("facebook")} /> */}
            </div>
        </div>
    </>
};
