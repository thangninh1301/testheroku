exports.success = ({data}) => {
    if (!data) {
        throw new Error("missing data")
    }
    return {
        success: true,
        status: 200,
        data
    }
};

exports.fail = ({reason = "Something was error"}) => ({
    success: false,
    status: 401,
    reason
});

exports.authenticationFail = ({reason = "Unauthorize"}) => ({
    success: false,
    status: 402,
    reason
});

exports.emailNotConfirmed = ({reason}) => ({
    success: false,
    status: 403,
    reason
});
