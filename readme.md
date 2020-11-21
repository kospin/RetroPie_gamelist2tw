# Retropie gamelist.xml 遊戲名稱中文化

    安裝完retropie再放入roms生gamelist後,雖然玩的很開心,但幾千個遊戲列表全是英文,跑隨機選擇識別度實在太低網路上又沒什麼人發佈gamelist.xml檔,只好開專案自行處理
  
    !!!目標:製作retropie中文gamelist.xml

## 0. 安裝 Rasberry Pi 中文字型

    sudo apt install fonts-droid

## 1. gamelist.xml 產生器

<https://github.com/sselph/scraper>

> scraper -mame

    就看著它跑完(會抓名稱,製作日期,說明資料等..和遊戲圖檔製作gamelist.xml,但資料庫源好像都英文)
    接著改成中文吧...

## 2.中文名稱對照表

+ google...
  
        很難找到可用的繁體中文對照表,簡體倒是很多但翻譯和台版差很多....

+ mamep.exe 中文列表

    > mamep.exe -ll > mamep.lst

        名稱:             描述:
        005               "005 情報員"
        10yard            "十碼大戰 ( 世界版 )"
        10yard85          "10-Yard Fight '85 (US, Taito license)"
        10yardj           "十碼大戰 ( 日版 )"
        ...

    >從mamep.exe列出全部games名稱對照表(依版本不同)

+ mameplus? mmo2txt lst.mmo 950 >lst.txt

>     \#
>     '88 Games
>     金牌運動會
>     
>     \#
>     '99: The Last War (set 1)
>     最後一戰 99
>     
>     \#
>     005
>     005 情報員
>     
>     \#
>     1 on 1 Government (Japan)
>     1 對 1 鬥牛
>     
>     ...

    英文=>繁體中文名稱對照表(這是game的英文名稱置換中文的翻譯表)

+ mameplus 122 makelang/txt/mame32tw.lst

        puckman 小精靈 (日本版 set 1, Probably Bootleg) 小精靈 (日本版 set 1, Probably Bootleg)  Namco
        puckmana 小精靈 (日本版 set 2) 小精靈 (日本版 set 2) Namco
        puckmanf 小精靈 (日本版 set 1 with speedup hack) 小精靈 (日本版 set 1 with speedup hack) Namco
        puckmanh 小精靈 / Puckman (Falcom?) 小精靈 / Puckman (Falcom?) hack
        ...

    >mamep122原始檔的lang/txt/mame32tw.lst game中文名稱對照表(Tab分格的csv檔)

+ <https://github.com/svn2github/mameplus/blob/master/trunk/mamep/makelang/text/mame_tw.lst>

    mamep svn搬到git備份原始檔的中文名稱對照表(格式如同上)
    看起來這個資料最新,但好像沒人更新維護了

+ **有更新更全的中文對照表嗎 ?**

## 3. gamelist.xml 中文名稱置換

        npm -i xml2js
        npm -i iconv-lite
        node gamelist2tw.js

>目前中文列表看起來還不錯

![展示圖](.readme/retropie.jpg)

## 4. 還有未完成事項

+ 中文名稱排序雖然堆在一起好像很好,但還是覺得哪裏怪怪的

+ mameplus裏有**mameinfo.dat** **history.dat** **command.dat**,如果資料能搬過去...那爽度就更大了

+ 簡,日,韓的名稱對照表都有,那要放到說明欄裏嗎?
