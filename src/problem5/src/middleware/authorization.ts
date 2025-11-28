import e, { Request, Response, NextFunction } from 'express';
import { AuthenticationRequest } from '../types/authenticationRequest';

const authorizationMiddleware = (req: AuthenticationRequest, res: Response, next: NextFunction) => {
    const user = req?.user; // Assume req.user is populated by previous authentication middleware

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: No user information found',
        });
    }

    const method = req.method;
    const [host, api, path] = req.baseUrl.split('/'); // Get the first segment of the path (e.g., 'hotels' from '/hotels/123')

    if (!path) {
        // Assume root path, allow access
        next();
    } else {
        if (user.role && user.role.permissions) {
            const resourcePermissions = user.role.permissions[path];
            if (resourcePermissions) {
                let requiredPermission = '';
                switch (method) {
                    case 'GET':
                        requiredPermission = 'read';
                        break;
                    case 'POST':
                        requiredPermission = 'create';
                        break;
                    case 'PUT':
                        requiredPermission = 'update';
                        break;
                    case 'DELETE':
                        requiredPermission = 'delete';
                        break;
                    default:
                        requiredPermission = '';
                }

                if (resourcePermissions.includes(requiredPermission)) {
                    return next();
                } else {
                    return res.status(403).json({
                        success: false,
                        message: 'Forbidden: You do not have permission to perform this action',
                    });
                }
            }
        }
        next();
    }
};

export default authorizationMiddleware;
