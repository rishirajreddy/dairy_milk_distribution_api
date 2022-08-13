# dairy_milk_distribution_api
Postman Collection Link : [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/13991890-c767e61b-7cf9-4c41-9bca-897467375fe1?action=collection%2Ffork&collection-url=entityId%3D13991890-c767e61b-7cf9-4c41-9bca-897467375fe1%26entityType%3Dcollection%26workspaceId%3Da3aae886-dee3-42b5-8914-46c6485c7c24)
# Link to Postman documentation <a href="https://www.postman.com/unikmafia/workspace/public-workspace/documentation/13991890-c767e61b-7cf9-4c41-9bca-897467375fe1">Link</a>
# Here are all the routes
<ul>
    <li><b>/add</b>: for adding the orders
       <br> <p>The orders will only be added if the total milk ordered is <b><</b> max milk for the day</p> 
    </li>
    <li><b>/update/:id</b>: for updating the orders</li>
    <li><b>/updateStatus/:id</b>: for updating the status of the orders</li><br>
    <p>
        if the status is provided other than than the given status i.e <span>"placed", "packed","dispatched","deleivered"</span><br>
        it will return error <br>
        else we can add the order status
    </p>
    <li><b>/delete/:id</b>:  for deleting the order</li>
    <li><b>/checkCapacity/:date</b>:  checking the left milk for the day</li>
</ul>
