<?php
/*
Plugin Name: 公武館API
Plugin URI: (プラグインの説明と更新を示すページの URI)
Description: 公武館の管理システムのAPIを叩いてレンダリングするためだけのAPI。
Version: 1.0.0
Author: masa
Author URI: (プラグイン作者の URI)
License: GPL2
*/



/*  Copyright 2019 masa (email : console@karate-koubukan.com)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
     published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/



function wp_koubukan_api($query ){

    $pagename = 'tournaments_result';

    if ( $pagename != $query->query['pagename'] ) {
        return;
    }

    add_action( 'wp_enqueue_scripts', function() {
        wp_enqueue_script( 'wp-koubukan-api-jquery',
            plugins_url( 'wp-koubukan-api/js/jquery-3.4.1.min.js' ),
            [ 'jquery' ]
        );
        wp_enqueue_script( 'wp-koubukan-api-js',
            plugins_url( 'wp-koubukan-api/js/main.js' ),
            [ 'jquery' ]
        );
		wp_enqueue_style( 'wp-koubukan-api-css',
            plugins_url( 'wp-koubukan-api/css/style.css' )
		);
    });

}

add_action('pre_get_posts', 'wp_koubukan_api');
 ?>
