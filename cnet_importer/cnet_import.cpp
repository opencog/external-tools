#include <QCoreApplication>
#include <QFile>
#include <QTextStream>
#include <QString>
#include <QStringList>
#include <QList>
#include <iostream>
#include <QTime>
#include <QMap>
#include <cmath>
#include <QDebug>
#include <QFuture>
#include <QtConcurrent/QtConcurrent>

//! ConceptNet to AS mapping
const QMap<QString,QString> cnet2as {
    {"/r/ConceptuallyRelatedTo", "IntensionalSimilarityLink"},
    {"/r/ThematicKLine", "IntensionalSimilarityLink"},
    {"/r/SuperThematicKLine", "IntensionalInheritanceLink"},
    {"/r/IsA", "InheritanceLink"},
    {"/r/PropertyOf", "InheritanceLink"},
    {"/r/DefinedAs", "SimilarityLink"},
    {"/r/PrerequisiteEventOf", "RetroactiveImplicationLink"},
    {"/r/FirstSubeventOf", "StartsLink"},
    {"/r/SubeventOf", "DuringLink"},
    {"/r/LastSubeventOf", "EndsLink"},
    {"/r/EffectOf", "PredictiveImplicationLink"},
    {"/r/HasPrerequisite", "RetroactiveImplicationLink"},
    {"/r/Causes", "PredictiveImplicationLink"},
    {"/r/HasProperty", "IntensionalInheritanceLink"},
    {"/r/HasSubevent", "DuringLink"}
};

//!word list
QStringList wlist;

//!freq of word list
QList<float> wfreqlist;

//! Clean data and write it to @param outf
void scrubsave(QStringList& lines,const QString& outf);

//! Write strings of lines to @param outf
void outf_append(QStringList& lines,const QString& outf);

//! Convert cnet assertions to an opencog scheme representation
inline QString to_scm_str(QStringList assertions,int templt,QString linktype,const QList<float>& meanlist,const QStringList& wlis);

//! Returns as equivalent of a cnet relation
inline QString mapper(QString cnetKey,bool dict);

//! Calculate freqencies of words in file @param fname and add result back to @param tl
void  freq(const QString fname,QList<float>&tl,QStringList& result);

//! validates and returns valid lines of cnet assertions with each lines being split by tab
QList<QStringList> get_acceptable_assertions(QStringList& assertions);

//! Convert to scm string and append to scm string
void append_to_scmstr(const QList<QStringList>& assertions,int begin,int end,QStringList& appendto);

int main(int argc, char *argv[])
{
    if (argc<4 || argc>4 ){
        std::cout<<"\nUsage\n input_file word_freq_file output_file";
        return -1;
    }

    QTime tm;
    tm.start();
    //!word count list
    QList<float>wclist;
    freq(argv[2],wclist,wlist);
    double tc=0.0;
    foreach(float ft,wclist){
        tc+=ft;
    }
    foreach(float ft,wclist){
        wfreqlist.append(ft/tc);
    }

    //QString buff;
    QFile fl(argv[1]);
    fl.open(QIODevice::ReadOnly);
    QTextStream ts(&fl);
    QStringList partial;
    QString line;

    while((line = ts.readLine()) != QString::null)
    {
        //read 100K lines TODO what about the last n lines?
        /*if(partial.size()!=0 and partial.size() % 100000 == 0)
        {
            //do processing
            QStringList scmlines;
            QList<QStringList> assertions = get_acceptable_assertions(partial);

            //parallelize
           // QFutureSynchronizer synchronizer;
            QFuture<void> f1 = QtConcurrent::run(append_to_scmstr,assertions,0,assertions.size()/4,scmlines);
            QFuture<void> f2 = QtConcurrent::run(append_to_scmstr,assertions,assertions.size()/4,assertions.size()/2,scmlines);
            QFuture<void> f3= QtConcurrent::run(append_to_scmstr,assertions,assertions.size()/2,assertions.size()*3/4,scmlines);
            QFuture<void> f4 = QtConcurrent::run(append_to_scmstr,assertions,assertions.size()*3/4,assertions.size(),scmlines);
            while(not (f1.isFinished() and f2.isFinished() and f3.isFinished() and f4.isFinished()));


            //append_to_scmstr(assertions,0,assertions.size(),scmlines);
            //write  scmlines to file
            //outf_append(scmlines,argv[3]);
            //clear
            partial.clear();
        }*/
        //else
        //{
            partial.append(line);
        //}

    }
    fl.close();
    QList<QStringList> assertions = get_acceptable_assertions(partial);
    QStringList scmlines;
    append_to_scmstr(assertions,0,assertions.size(),scmlines);
    outf_append(scmlines,argv[3]);

    std::cout<<"\ntime taken ="<<tm.elapsed()/1000.0<<" seconds";
    std::cout<<"\ndone.\n";
    return 0;
}

QList<QStringList> get_acceptable_assertions(QStringList& assertions){
    QList<QStringList> gsl ;
    foreach (QString st,assertions){
        QStringList sp=st.split("\t");
        if (sp.count()<6) continue;
        QString st1=sp[2];
        QString st2=sp[3];
        if (st1.startsWith("/c/en/")&&st2.startsWith("/c/en/")){
            QStringList sst;
            sst<<sp[1];sst<<sp[2];sst<<sp[3];sst<<sp[4];sst<<sp[5];
            gsl<<sst;
        }
    }

    return gsl;
}

inline QString to_scm_str(QStringList assertions,int templt,QString linktype,const QList<float>& meanlist,const QStringList& wlist)
{
    //std::cout<<".";
    float cn_confidence = assertions[4].toFloat();
    float confidence_value=0.0;
    if (cn_confidence > 0.0)
    {
        confidence_value = 1.0 - pow(0.2,cn_confidence)/2.0;
    }

    QString cn_argument1 = assertions[1].mid(6);
    cn_argument1 = cn_argument1.left(cn_argument1.indexOf('/'));
    int i =wlist.indexOf(cn_argument1);
    float mean = (i !=-1) ? meanlist[i] : 0.0;
    float confidence = 0.95;
    QString cn1 = "(ConceptNode \""+cn_argument1+"\" (stv "+QString::number(mean)+" "+QString::number(confidence)+"))";

    QString cn_argument2 = assertions[2].mid(6);
    cn_argument2 = cn_argument2.left(cn_argument2.indexOf('/'));
    i =wlist.indexOf(cn_argument2);
    mean = (i !=-1) ? meanlist[i] : 0.0;
    confidence = 0.95;
    QString cn2 = "(ConceptNode \""+cn_argument2+"\" (stv "+QString::number(mean)+" "+QString::number(confidence)+"))";

    if(templt == 1){
        QString link = QString("(") + linktype + "(stv "  + QString::number(confidence_value) + " " +QString::number(0.9) + ")\n " + cn1 + cn2 + ")\n";
        return link;
    }
    else if(templt == 2){
        QString cn_relation = assertions[0].mid(3);
        cn_relation = cn_relation.left(cn_relation.indexOf('/'));
        QString pn = "(PredicateNode \""+cn_relation+"\" (stv "+QString::number(confidence_value)+" "+QString::number(0.9)+"))";
        QString listlink = "(ListLink\n  "+cn1+"\n  "+cn2+")";
        QString evallink = "(EvaluationLink (stv "+QString::number(confidence_value)+"  "+QString::number(0.9)+")\n  "+pn+"\n  "+listlink+")\n";
        return evallink;
    }
    return QString();
}

inline QString mapper(QString cnetKey,bool dict){
    if (dict){
        if (cnet2as.contains(cnetKey)){
            return cnet2as[cnetKey];
        }
        return "EvaluationLink";
    }else{
        if (cnetKey=="/r/EffectOf")return "EvaluationLink";
        return QString();
    }
    return QString();
}

void  freq(const QString fname,QList<float>&tl,QStringList& result){
    //Header of word freq file is [RANK #,PoS,  WORD,TOTAL,SPOKEN,FICTION,MAGAZINE,NEWSPAPER,ACADEMIC]
    QFile fl(fname);
    int col=2;
    fl.open(QIODevice::ReadOnly);
    QTextStream tx(&fl);
    QString buff=tx.readAll();
    fl.close();
    QStringList ls=buff.split('\n');
    foreach(QString ss,ls){
        QStringList st1=ss.split(",");
        if (st1.count()>col+1){
            result<<st1[col];
            tl.append(st1[col+1].toFloat());
        }
    }
    if (result.count()>0){
        result.removeAt(0);
        tl.removeAt(0);
    }
}

void append_to_scmstr(const QList<QStringList>& assertions,int begin,int end,QStringList& appendto){
    for(int i=begin; i < end; i++){
        QStringList asl = assertions[i];
        //foreach (QStringList asl, assertions) {
        // std::cout<<count_down--;
        if (mapper(asl[0],false)!=""){
            appendto.append(to_scm_str(asl,2,"",wfreqlist,wlist));
        }
        if ((mapper(asl[0], true) == "EvaluationLink") and
                (mapper(asl[0], false) != "EvaluationLink")){
            //this condition is to prevent repetition of EvaluationLink
            appendto.append(to_scm_str(asl,2,"",wfreqlist,wlist));
        }
        else if(mapper(asl[0], true) != "EvaluationLink"){
            appendto.append(to_scm_str(asl,1,mapper(asl[0], true),wfreqlist,wlist));
        }
        //}
    }
}

void scrubsave(QStringList& lines,const QString& outf)
{
    QStringList desired;
    foreach(QString line,lines) {
        QStringList sp=line.split("\t");
        if (sp.count()<6) continue;
        if(sp[2].startsWith("/c/en/") && sp[3].startsWith("/c/en/"))
            desired.append(line);
    }
    QFile fl(outf);
    fl.open(QIODevice::WriteOnly);
    QTextStream ts(&fl);
    ts<<desired.join("\n");
    ts.flush();
    fl.close();
}

void outf_append(QStringList& lines,const QString& outf)
{
    QFile fl(outf);
    fl.open(QIODevice::Append);
    QTextStream ts(&fl);
    ts<<lines.join("\n");
    ts.flush();
    fl.close();
}
