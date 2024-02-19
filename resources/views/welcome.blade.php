<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<div class="tols d-flex justify-content-center">
    



<form method="POST" action="https://yoomoney.ru/quickpay/confirm">
    <input type="hidden" name="receiver" value="4100117907658443" />
    <input type="hidden" name="label" value="$order_id" />
    <input type="hidden" name="quickpay-form" value="button" />
    <input type="hidden" name="sum" value="2" data-type="number" />
    <label><input type="radio" name="paymentType" value="PC" />ЮMoney</label>
    <label
        ><input type="radio" name="paymentType" value="AC" />Банковской
        картой</label
    >
    <input type="submit" value="go" />
</form>










<hr><br>
    <div class="content_donate ">
        <div class="col-md-12">
            <p style="color: gray">Название платежа</p>
            <p >Поддержка проекта</p>
            <form onsubmit="return submitForm()" method="POST" action="https://yoomoney.ru/quickpay/confirm"> 
                <input type="hidden" name="receiver" value="4100117907658443"> 
                <input type="hidden" name="quickpay-form" value="shop"> 
                <input type="hidden" name="targets" value="Пожертвование"> 
                <!-- <label name="yandex"><input class="chect" name="money_type" type="radio" checked value="PC">  Яндекс.Деньги</label> -->
                <!-- <label name="kart"><input class="chect" name="money_type" type="radio" value="AC">  Картой</label> -->

                <input class="chect" type="hidden" name="money_type" type="radio" value="AC"> 
                <input id="moneyType" type="hidden" name="paymentType" value="AC">
                <input type="hidden" name="successURL" value="api.worldaion.com/test">
                <input type="hidden" name="label" value="bob12"> 
                <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value='50' name="sum" placeholder="Сумма" required>
                <input class="btn btn-success"  type="submit" value="Оплатить"> 
                <!-- <input class="btn btn-success" onclick="send_monay_type()" type="submit" value="Оплатить">  -->
            </form>
            <hr>
        </div>

            
    </div>   
    
</div>
</body>
</html>