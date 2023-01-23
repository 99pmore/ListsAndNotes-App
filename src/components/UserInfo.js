export const UserInfo = ({ user }) => {

    return (
        <div className="info">

            {
                user ?
                    <>
                        <img src={ user.photoURL ? user.photoURL : '../assets/avatar.webp' } alt="" />
                        <p>{ user.displayName }</p>
                    </>
                : null
            }

        </div>
    )
}