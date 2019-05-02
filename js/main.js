console.log('get_tournaments.start');

get_tournaments();


function get_tournaments(){
    console.log('get_tournaments');

    $.ajax({
        // url:'https://stg-koubukan-console.rabeace.com/api/tournaments/result', // 通信先のURL
        url:'https://koubukan-console.rabeace.com/api/tournaments/result', // 通信先のURL
        type:'GET',    // 使用するHTTPメソッド (GET/ POST)
        dataType:'json', // 応答のデータの種類
        timeout:1000,     // 通信のタイムアウトの設定(ミリ秒)
        xhrFields: {
            withCredentials: false
        }

    }).done(function(data1,textStatus,jqXHR) {

        let resultData = data1;

        let tournamentResults = document.getElementById('tournament-results');

        for (key in resultData){
            let tournament_id = resultData[key]['id'];
            let tournament_title = resultData[key]['title'];
            let tournament_date = resultData[key]['date'];
            let tournament_place = resultData[key]['place'];

            tournamentResults.insertAdjacentHTML('beforeend',`
            <div id="tournament-${tournament_id}" class="api_content">
                <div class="tournament_title">
                    <h2>${tournament_title}</h2>
                    <p>開催日：${tournament_date}</p>
                    <p>会場　：${tournament_place}</p>
                    <div id="tournament-result-${tournament_id}" class="tournament_result_layout" ></div>
                    <a onClick="renderResult(${tournament_id})" id="collapse-${tournament_id}" class="collapse_button" data-collapse="closed" data-api="0">
                    詳細情報を開く
                    </a>
                </div>
            </div>
            `);
        }

    }).fail((jqXHR, textStatus, errorThrown) => {
        console.log('fail', jqXHR.status);
    });
}

/**
 * APIを叩く前の状態なら、APIを叩いて情報を取得する。
 * @param tournament_id 取得したい大会のID
 * @return void
 */
function renderResult(tournament_id){

    let collapseButton = document.getElementById('collapse-' + tournament_id);
    let resultArea = document.getElementById('tournament-result-' + tournament_id);
    let apiStatus = collapseButton.getAttribute('data-api');

    if(apiStatus == 0){
        getTournament(tournament_id);
    }

    collapseController(tournament_id);

}

/**
 * 大会の個別の結果を閉じたり開いたりするメソッド
 * @param tournament_id 取得したい大会のID
 * @return void
 */
function collapseController(tournament_id){

    let collapseButton = document.getElementById('collapse-' + tournament_id);
    let resultArea = document.getElementById('tournament-result-' + tournament_id);

    let collapseStatus = collapseButton.getAttribute('data-collapse');

    $(resultArea).toggleClass('open');
    $(resultArea).next('.toggle_contents').slideToggle();

    if(collapseStatus == "closed"){
        console.log('tournament id:'+tournament_id + ' open');

        // 開く処理
        collapseButton.setAttribute('data-collapse', "opened");
        collapseButton.textContent = "詳細情報を閉じる";
        resultArea.style.display = 'block';
        resultArea.style.opacity = 1;
        resultArea.style.visibility = 'visible';


    }else {
        console.log('tournament id:'+tournament_id + ' close');

        //　閉じる処理
        collapseButton.setAttribute('data-collapse', "closed");
        collapseButton.textContent = "詳細情報を開く";
        resultArea.style.display = 'none';
        resultArea.style.opacity = 0;
        resultArea.style.visibility = 'hidden';


    }
}

/**
 * 大会の個別の結果を取得して、レンダリングするメソッド
 * @param tournament_id 取得したい大会のID
 * @return void
 */
function getTournament(tournament_id){
    console.log('get tournament id:'+tournament_id);

    $.ajax({
        // url:'https://stg-koubukan-console.rabeace.com/api/tournament/result', // 通信先のURL
        url:'https://koubukan-console.rabeace.com/api/tournament/result', // 通信先のURL
        type:'GET',    // 使用するHTTPメソッド (GET/ POST)
        data:{
            'tournament_id':tournament_id
        },
        dataType:'json', // 応答のデータの種類
        timeout:1000,     // 通信のタイムアウトの設定(ミリ秒)
        xhrFields: {
            withCredentials: false
        }

    }).done(function(data,textStatus,jqXHR) {

        let resultData = data['results'];

        let tournamentResult = document.getElementById('tournament-result-' + tournament_id);

        for (key1 in resultData){
            let type1_title = resultData[key1]['title'];
            tournamentResult.insertAdjacentHTML('beforeend',`<h3>${type1_title}</h3>`);

            let type1_results = resultData[key1]['result'];
            for (key2 in type1_results) {
                let type2_title = type1_results[key2]['title'];
                tournamentResult.insertAdjacentHTML('beforeend',`<h4>【${type2_title}】</h4>`);

                let type2_results = type1_results[key2]['result'];
                for (key3 in type2_results) {
                    let resultRow = type2_results[key3];
                    tournamentResult.insertAdjacentHTML('beforeend',`<p>${resultRow}</p>`);
                }
            }
        }

        let target = document.getElementById('collapse-' + tournament_id);
        target.setAttribute('data-api', 1);

    }).fail((jqXHR, textStatus, errorThrown) => {
        console.log('fail', jqXHR.status);
    });
}
