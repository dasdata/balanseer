var devicesLocalFile = './../assets/home_devices.json';
var boardsLocalFile = './../assets/devices.json';
var boardList = '';

var selectedBoard = 'Golden';
var selectedDevice = 'arduino';

function cmdSelectBoard(boardID, boardName) {
    $('#section-three').slideUp();
    // console.log(boardID);
    $('#myBoardsList').val(boardID);
    selectedDevice = boardID;
    selectedBoard = boardName;
    $('#divBoard').html(boardName);
}

$("#myBoardsList").change(function (event) {
    selectedBoard = $("#myBoardsList option:selected").text();
    selectedDevice = $(this).val();
    $('#divBoard').html(selectedBoard);
});


var ConsumerScore = "8.63";
var ConsumerNow = "44";
var ConsumerBonusNow = "14";
var ConsumerWeek = "244";
var ConsumerBonusWeek = "24";
var ConsumerMonth = "344";
var ConsumerBonusMonth = "34";
var ConsumerYear = "444";
var ConsumerBonusYear = "54";


$(document).ready(function () {
    $('.menu .item')
        .tab();

    cmdDevicesList();
    // cmdGetBoardList();
    cmdCalculateDevices();

    $('#divBoard').html(selectedBoard);
    $('#myDDL').dropdown({
        maxSelections: 1
    });

    /*
    $("#btnSelectBoard").on("click", function (event) {
        $('#divLabel').html((this).val("#myBoardsList"));        
    });
    */


    function cmdPostMe(actionType, boardID, patternID) {
        var apiURL = 'api?=actiontype=' + actionType + '&token=' + boardID + '&pattern=' + patternID;
        $('#divLabel').html(boardID + ' ' + actionType);
        $.ajax({
            type: "POST",
            url: apiURL,
            success: function (response) {
                var arr = JSON.parse(response)
                _apiPostResult = JSON.stringify(arr);
                console.log(_apiPostResult);
            },
            error: function (err) {
                console.log('ERROR');
            }
        });
    }


    $("#btnRide").on("click", function (event) {
        var _apiPostResult = '';
        $('#divLabel').html();
        cmdPostMe('ride', selectedDevice, 'riding')
        $('#divLabel').html(" Ride mode ");
    });




    // $(".modal_ces_video").modalVideo({ channel: 'youtube', start: 200, autoplay: 1 });
    // $(".modal_schaeffler_video").modalVideo({ channel: 'youtube', start: 0, autoplay: 1 });

    // $('#divLikes').html( "3333" );

// AIzaSyChADAVzUyaQX2KOFc4ZeUXplKykuIvlfk

    $(window).scroll(function () {
        var height = $(window).scrollTop();
        if (height > 100) {
            $('#section-two .grid').addClass('animated slideInUp');
        }
    });

    $('#toggle').click(function () {
        $('.ui.sidebar').sidebar('toggle');
    });


    function cmdDevicesList() {
        readTextFile(devicesLocalFile, function (text) {
            var arrayOfObjects = JSON.parse(text);
            var cardBoards = '<h2>Your smarthome devices</h2><div class="ui one stackable cards">';
            for (var i = 0; i < arrayOfObjects.devices.length; i++) {
                var deviceName = arrayOfObjects.devices[i].deviceName;
                var deviceID = arrayOfObjects.devices[i].deviceID;
                var deviceDescription = arrayOfObjects.devices[i].deviceDescription;
                var deviceConsumption = arrayOfObjects.devices[i].deviceConsumption;
                var devicePicture = arrayOfObjects.devices[i].devicePicture;
                var deviceStatus = arrayOfObjects.devices[i].deviceStatus;
                var deviceOnOff = "off";
                var switchOnOffCheck = "check";
                if (deviceStatus == deviceOnOff) {
                    deviceOnOff = "grey big ";
                    switchOnOffCheck = "";
                } else {
                    switchOnOffCheck = "checked";
                    deviceOnOff = "green big ";
                }
                //   cardBoards += '<div style="cursor:pointer" title="' + deviceName + '" class="card" onclick="cmdSelectBoard(\'' + deviceID + '\',\'' + deviceName + '\')">  <div class="content">  <i class="left '+ devicePicture +' floated icon button ' + deviceOnOff + '"></i>  <div class="header">' + deviceName + '</div>  <div class="description">' + deviceDescription + '</div> </div> </div>';
                var switchControlOnOff = '<div class="ui bigCheckbox" "> <input style="width:50px;height:53px;" type="checkbox" onclick="alert(\'' + deviceID + '\', \'' + deviceConsumption + '\')" class="ui form right floated "  id="on-off-switch' + deviceID + '" name="switch' + deviceID + '" ' + switchOnOffCheck + '></div>';
                cardBoards += '<div style="cursor:pointer;" onclick="alert(\'' + deviceID + '\', \'' + deviceConsumption + '\')" class="ui card"><div class="content">' + switchControlOnOff + '<i style="cursor:pointer;margin-right:20px;"  class="left floated ' + devicePicture + ' icon button big ' + deviceOnOff + '"></i><div class="header">' + deviceName +' ('+ deviceConsumption + ')</div><p>' + deviceDescription + '</p></div></div>';
                //   cardBoards  += deviceName;                
            }
            cardBoards += '</div><br><br>';
            $('#divHomeDevices').html(cardBoards);
            $('#divHomeDevicesLenght').html(' ' + arrayOfObjects.devices.length + ' registred devices');
        });
    }


    function cmdCalculateDevices() {
        //  alert(ConsumerNow);
        $('#divConsumerScore').html(ConsumerScore);
        $('#divConsumerNow').html(ConsumerNow + ' kWH');
        $('#divConsumerBonusNow').html(ConsumerBonusNow + ' units');
        $('#divConsumerWeek').html(ConsumerWeek + ' kWH');
        $('#divConsumerBonusWeek').html(ConsumerBonusWeek + ' units');
        $('#divConsumerMonth').html(ConsumerMonth + ' kWH');
        $('#divConsumerBonusMonth').html(ConsumerBonusMonth + ' units');
        $('#divConsumerYear').html(ConsumerYear + ' kWH');
        $('#divConsumerBonusYear').html(ConsumerBonusYear + ' units');
        //  $('#consumer').html(cardBoards);
    }


    function cmdCheckLikes() {
        var valLikes = '';
        readTextFile(likesLocalFile, function (text) {
            var arrayOfObjects = JSON.parse(text)
            $(likeDiv).empty();
            $(likeDiv).html(arrayOfObjects.likes.length);
        });
    }


    function json2array(json) {
        var result = [];
        var keys = Object.keys(json);
        keys.forEach(function (key) {
            result.push(json[key]);
        });
        return result;
    }

    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }


});

/*

$("#btnLike").on("click", function (event) {
    var _actualVal = $('#divLikes').text();
    var _likeItems = parseInt(_actualVal) + 1;
    var _apiPostResult = '';
    $.ajax({
        type: "POST",
        url: "api/like",
        // data: "{'code':'"+ selectedValue +"'}", //"{'code':'"+ selectedValue +"'}",
        success: function (response) { 
            var arr = JSON.parse(response)
            _apiPostResult = JSON.stringify(arr);
            console.log(_apiPostResult);
        },
        error: function (err) {
            console.log('ERROR');
        }
    }); 
   // $(likeDiv).empty(); 
   $('#btnLike').toggle();
  //   $('#divLabel').empty();
    $(likeDiv).html(_likeItems);
    $('#divConfirmLikes').toggle();
    $('#divConfirmLikes').html(" <h2> We're happy you liked our eBoard, now take it for a spin! </h2> <a href='http://eboard.setmore.com/' class='ui button huge green'>Book testdrive 	&nbsp;	&nbsp; <i class='checked calendar icon'></i> </a>");
    //   cmdCheckLikes();
});


*/