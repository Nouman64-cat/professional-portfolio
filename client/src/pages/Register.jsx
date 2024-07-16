

const Register = () => {
    
      return (
        <div className="flex flex-col min-h-screen w-full content-center items-center justify-center">
            <div className="w-full max-w-screen-lg px-4">
                <h1 className="text-3xl text-primary font-montserrat font-bold mb-5 text-center">Register</h1>
                <form className="flex flex-col gap-4 items-center">
                    <input className="w-[50%] border-primary-Primary border-2 p-4 rounded-full" type="text" placeholder="Full Name" />
                    <input className="w-[50%] border-primary-Primary border-2 p-4 rounded-full" type="email" placeholder="Email Address" />
                    <input className="w-[50%] border-primary-Primary border-2 p-4 rounded-full" type="password" placeholder="Password" />
                    <input className="w-[50%] border-primary-Primary border-2 p-4 rounded-full" type="password" placeholder="Confirm Password" />
                    <button type="submit" className="px-10 py-4 w-[50%] rounded-full text-white  bg-primary hover:bg-slate-700">
                        Register
                    </button>
                </form>
            </div>
        </div>
      )
}

export default Register