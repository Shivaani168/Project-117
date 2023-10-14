$(document).ready(function(){

    console.log('Ready')

    //  Fetch the current date and update it in the DOM
    let date = new Date()
    let current_date = date.toDateString()
    $('#date').text('Date : ' + current_date)


    //  write an event, when Submit button is clicked
    $('#button').click(function(){

        //  get the text value from the textarea using the 'val()' method
        let input_text = {"text": $('#text').val()}
        console.log(input_text)


        //  ajax request
        $.ajax({
            type : 'POST',
            url:"/review",
            data : JSON.stringify(input_text),
            dataType : 'json',
            contentType : 'application/json',
            success : function(result){
                // extract prediction and emoticon url from result
                predicted_emotion = result.data.predicted_emotion
                emo_code_url = result.data.predicted_emotion_img_url

                //  update the DOM elements
                $("#predicted_emotion").html(predicted_emotion)
                $('#predicted_emotion').css("display","block")
                //  show them
                $("#predicted_emotion_img_url").attr('src',emo_code_url)
                $('#predicted_emotion_img_url').css("display","block")
            },

            //  if any error, run this function
            error: function (result) {
                alert(result.responseJSON.message)
            }
        })

        //  clearing the textbox after every button push
        $('#text').val("")
    })
        
})