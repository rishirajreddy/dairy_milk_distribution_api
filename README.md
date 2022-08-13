# dairy_milk_distribution_api
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
