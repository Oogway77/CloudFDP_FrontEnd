import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history }) {
    useEffect(() => {
        function unlisten() {
            history.listen(() => {
                document.body.scrollTo({top:0, behavior:"smooth"});
            });
        }
        unlisten();
    }, [history]);

    return (null);
}

export default withRouter(ScrollToTop);