import userResolvers from "./user.resolvers.js";
import mealResolvers from "./meal.resolvers.js";
import reviewResolvers from "./review.resolvers.js"
import subscriptionResolvers from "./subscription.resolvers.js";
import orderResolvers from "./order.resolvers.js";

export const resolvers = [userResolvers, mealResolvers, reviewResolvers, subscriptionResolvers, orderResolvers]