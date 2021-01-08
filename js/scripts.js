(function($) {
  "use strict"; // Start of use strict

  const nameForm = $('#contactForm').find('#name');
  const emailForm = $('#contactForm').find('#email');
  const messageForm = $('#contactForm').find('#message');
  const phoneForm = $('#contactForm').find('#phone');

  // 入力チェック
  const valedate = (e) => {
    $('#name_error').removeClass('error_area');
    $('#name_error').text('');
    $('#email_error').removeClass('error_area');
    $('#email_error').text('');
    $('#message_error').removeClass('error_area');
    $('#message_error').text('');
    $('#phone_error').removeClass('error_area');
    $('#phone_error').text('');

    // 送信可否の判定
    let checkFlg = 0;
    // 名前必須チェック
    if (nameForm.val() == '') {
      checkFlg = 1;
      $('#name_error').text('必須入力です。');
      $('#name_error').addClass('error_area');
    } else {
      // 名前文字数チェック
      if (nameForm.val().length >= 40) {
        checkFlg = 1;
        $('#name_error').text('40文字以下で入力してください。');
        $('#name_error').addClass('error_area');
      }
    }

    // メールアドレス必須チェック
    if (emailForm.val() == '') {
      checkFlg = 1;
      $('#email_error').text('必須入力です。');
      $('#email_error').addClass('error_area');
    } else {
      // メールアドレス整合性チェック
      if (!emailForm.val().match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)) {
        checkFlg = 1;
        $('#email_error').text('正しいメールアドレスを入力してください。');
        $('#email_error').addClass('error_area');
      }

      // メールアドレス文字数チェック
      if (emailForm.val().length >= 60) {
        checkFlg = 1;
        $('#email_error').text('60文字以下で入力してください。');
        $('#email_error').addClass('error_area');
      }
    }

    // メッセージ必須チェック
    if (messageForm.val() == '') {
      checkFlg = 1;
      $('#message_error').text('必須入力です。');
      $('#message_error').addClass('error_area');
    } else {
      // メッセージ文字数チェック
      if (messageForm.val().length >= 600) {
        checkFlg = 1;
        $('#message_error').text('600文字以下で入力してください。');
        $('#message_error').addClass('error_area');
      }
    }

    // 電話番号文字種チェック（ハイフン可）
    if (phoneForm.val() !== '' && !phoneForm.val().match(/^[0-9\-]+$/)) {
      checkFlg = 1;
      $('#phone_error').text('数字で入力してください。');
      $('#phone_error').addClass('error_area');
    }
    return checkFlg
  };

  // fireBase登録処理
  const fireBaseRegis = (e) => {
    e.preventDefault();
    let mailKey = messageForm.val().length
    const mailLocation = `mails/`+mailKey;
    // メール送信データ
    const mailData = {
      username: nameForm.val(),
      email: emailForm.val(),
      phoneNumber: phoneForm.val(),
      message: messageForm.val(),
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };
    firebase
    .database()
    .ref(mailLocation)
    .set(mailData)
    .catch((error) => {
      console.error('登録処理に失敗:', error);
    });
  };

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 75
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").removeClass("navbar-scrolled");
    }
  };

  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
  // Magnific popup calls
  $('#portfolio').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });
  // 送信ボタン押した時の処理
  $('#sendMessageButton').on('click', function(e) {
    const checkFlg = valedate(e);
    if (checkFlg === 0) {
      fireBaseRegis(e);
      // 完了画面表示
      $('#complete').show();
      $('#home').hide();
    } else {
      e.preventDefault();
    }
  });
})(jQuery); // End of use strict
