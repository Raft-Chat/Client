import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

function Header() {
    const { loginWithPopup, loginWithRedirect } = useAuth0()

    return (
        <div className="min-h-screen">
            <nav className="relative flex w-full items-center justify-between bg-white py-2 shadow-sm lg:flex-wrap lg:justify-start">
                <div className="flex w-full flex-wrap items-center justify-between px-6">
                    <div className="flex items-center">
                        <Link className="text-primary dark:text-primary-400" to={'/'}>
                            <img className="h-10" alt="Raft" src="/Logo.PNG" />
                        </Link>
                    </div>

                    <div className="my-1 flex items-center lg:my-0 lg:ml-auto">
                        <button
                            onClick={() => loginWithPopup()}
                            className="btn btn-primary btn-ghost">
                            Login
                        </button>
                    </div>
                </div>
            </nav>

            <section
                className="mb-40 flex flex-col flex-grow justify-center items-center"
                style={{ minHeight: 'calc(100vh - 80px)' }} // Adjust the 64px if you have a different header height
            >
                <div className="py-24 px-6 text-center  flex flex-col justify-center items-center">
                    <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                        Start Chatting, Sharing & Caring ! <br />
                        <span className="text-secondary">with your loved one's</span>
                    </h1>
                    <button
                        onClick={() => loginWithRedirect({
                            authorizationParams: {
                                screen_hint: 'signup'
                            }
                        })}
                        className="btn btn-secondary">
                        Get started
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Header;
