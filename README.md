## API Reference

#### SERVER

```http
  AUTH /api
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/signup` | Signup |
| `POST` | `/signup` | Signup |
| `GET` | `/login` | Login |
| `POST` | `/login` | Login |
| `POST` | `/logout` | Logout |

```http
  USERS /api/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/` | Get All Users |
| `PUT` | `/editProfile` | Edit User |
| `DELETE` | `/:user_id/delete` | Delete User |

```http
  MEALS /api/meals/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/` | Get All Meals | ✅
| `GET` | `/:meal_id` | Meal's Details | ✅
| `GET` | `/mealsFilter` | Meal's Filter By Category | ✅
| `GET` | `/:meal_id/getNutritionalValuesPerPortion` | Meal's Values Per Portion |
| `POST` | `/create` | Create Meal | ✅
| `PUT` | `/:meal_id/edit` | Edit Meal | ✅
| `PUT` | `/:meal_id/addPicture` | Add Meal Picture |
| `PUT` | `/:meal_id/deletePicture` | Delete Meal Picture |
| `DELETE` | `/:meal_id/delete` | Delete Meal | ✅



```http
  ORDER /api/order/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/` | Get All Orders | ✅
| `GET` | `/getActiveOrder` | Get Active Order |
| `GET`| `/getNextOrder` | Get Next Order |
| `GET`| `/getDeliveredOrders` | Get Delivered Orders |
| `POST` | `/create` | Create Order | 
| `PUT` | `/:order_id/addMeal` | Add Meal to Order | ✅
| `PUT`| `/:order_id/removeMeal` | Remove Meal from Order | ✅
| `PUT`| `/:order_id/updateMealQuantity` | Update Meal Quantity | ✅


```http
  SUBSCRIPTIONS /api/subscriptions/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/` | Get All Subscriptions |
| `GET` | `/getUserSubscription/:user_id` | Get User's Subscription Details|
| `GET` | `/getMySubsctiptionDetails` | Subscription's Details |
| `POST` | `/create` | Create Subscription | // lógica para crear el menú base
| `PUT`| `/:subscription_id/changeStatus` | Pause or Activate Subscription |
| `DELETE` | `/:subscription_id/delete` | Cancel Subscription |


```http
  REVIEWS /api/reviews/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `GET` | `/:meal_id/reviews` | Get All Reviews for One Meal |
| `POST` | `/create` | Create Rating and Post Comment | // También actualiza el meal rating